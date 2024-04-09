import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import Geolocation from "react-native-geolocation-service"
import { Colors } from '../utils/Colors';
import GeneralButton from '../components/GeneralButton';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MapScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [datas, setData] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [back, setBack] = useState(true);
  const [selectedStar, setSelected] = useState('全部');
  const [markers, setMarkers] = useState([]);

  const fetchlikedStar = async () => {
    try {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(doc => {
          let temp = [{ name: "全部" }, { name: "個人" }];
          const { likedStars } = doc.data();
          setData(temp.concat(likedStars));
        });

      if (loading) {
        setLoading(false);
      }

    } catch (e) {
      console.log(e)
    }
  }

  const handleLocationPermission = async () => {
    let permissionCheck = '';
    if (Platform.OS === 'ios') {
      permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (permissionCheck === RESULTS.BLOCKED || permissionCheck === RESULTS.DENIED) {
        const permissionRequest = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('location permission denied.');
      }
    } else if (Platform.OS === 'android') {
      permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (permissionCheck === RESULTS.BLOCKED || permissionCheck === RESULTS.DENIED) {
        const permissionRequest = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('location permission denied.');
      }
    }
  };

  const curPos = async () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        setLocation({ latitude, longitude })
      },
      error => {
        console.log(error.code, error.message)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  const renderMarker = async () => {
    const list = [];
    try {
      await firestore().collection('pins')
        .where('userID', '==', user.uid)
        .get()
        .then((query) => {
          query.forEach((doc) => {
            const { caption, star, postTime, location } = doc.data();
            if (selectedStar === '全部' || star === selectedStar) {
              list.push({
                id: doc.id,
                postTime,
                caption,
                latlng: location,
                star,
              })
            }
          })
        })
      //console.log(list);
      setMarkers(list);
      if (loading) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    handleLocationPermission();
    curPos();
    renderMarker();
    fetchlikedStar();
  }, [navigation])

  useEffect(() => {
    renderMarker();
    fetchlikedStar();
    navigation.addListener("focus", () => setBack(!back));
  }, [back])

  useEffect(() => {
    renderMarker();
  }, [selectedStar])

  return (
    <SafeAreaView style={styles.safe}>
      {loading ? (
        <View style={styles.load}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          {
            location && (
              <MapView
                style={styles.mapStyle}
                initialRegion={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                showsMyLocationButton={true}
                showsUserLocation={true}
              >
                {
                  markers && (markers.map(marker => (
                    <Marker
                      key={marker.id}
                      coordinate={marker.latlng}
                      pinColor={Colors.green}
                      title={marker.star}
                      description={marker.caption}
                      showCallout
                    />
                  )))
                }
              </MapView>
            )
          }
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={datas}
            maxHeight={200}
            labelField="name"
            valueField="name"
            placeholder="選擇偶像"
            fontFamily='NotoSansTC-Regular'
            value={selectedStar}
            onChange={item => {
              setSelected(item.name);
            }}
            renderLeftIcon={() => (
              <MaterialCommunityIcons style={styles.icon} color={Colors.black} name="star" size={25} />
            )}
          />
          <View style={styles.buttonContainer}>
            <GeneralButton
              buttonTitle="Add Pin"
              color={Colors.white}
              backgroundColor={Colors.primaryColor}
              aligned='center'
              width='25%'
              onPress={() => {
                navigation.navigate(
                  'AddPost',
                  {
                    location: location,
                    liked: datas.slice(1),
                  }
                );
              }}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  load: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    bottom: Platform.OS === 'android' ? -610 : -550,
    alignSelf: 'flex-end',
    marginRight: 5,
  },
  dropdown: {
    width: '50%',
    height: 45,
    borderBottomColor: Colors.black,
    borderBottomWidth: 0.8,
    top: 0,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginLeft: 5,
  },
  icon: {
    color: Colors.black,
    marginRight: 8,
  },
  placeholderStyle: {
    color: Colors.black,
    fontSize: 16,
    marginBottom: 5,
  },
  selectedTextStyle: {
    color: Colors.black,
    fontSize: 16,
    marginBottom: 5,
  },
  iconStyle: {
    width: 28,
    height: 28,
  },
});