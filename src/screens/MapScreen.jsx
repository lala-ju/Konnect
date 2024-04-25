import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Button, ActivityIndicator, Image } from 'react-native';
import React, { useContext, useEffect, useState,  useCallback, useMemo, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import Geolocation from "react-native-geolocation-service"
import { Colors } from '../utils/Colors';
import GeneralButton from '../components/GeneralButton';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet, { BottomSheetSectionList, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { windowHeight, windowWidth } from '../utils/Dimension';
import NewsCard from '../components/NewsCard';
import { getDistance } from 'geolib';
import Geocoder from 'react-native-geocoding';
import PinCard from '../components/PinCard';

const MapScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [datas, setData] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [back, setBack] = useState(true);
  const [selectedStar, setSelected] = useState('全部');
  const [markers, setMarkers] = useState([]);
  const [starmarkers, setStarMarkers] = useState([]);
  const [chosenLocation, setChosenLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [official, setOfficial] = useState("");
  const [locationImg, setLocationImg] = useState("");

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '80%'], []);
  const filterLocation = (curLocation) => {
    if(curLocation === null){
      return [{title: "", data: []}];
    }
    const personal = markers.filter((marker) => marker.latlng.latitude === curLocation.latitude && marker.latlng.longitude === curLocation.longitude);
    const newPersonal = personal.map(({
      caption: word,
      postTime: time,
      star: star,
      img: img
    }) => ({
      event: "",
      word,
      time,
      star,
      img,
      starImg: "",
      type: "personal"
    }));
    const stars = starmarkers.filter((marker) => marker.latlng.latitude === curLocation.latitude && marker.latlng.longitude === curLocation.longitude);
    const newStars = stars.map(({
      title: event,
      place: place,
      info: word,
      playTime: time,
      star: star,
      img: img,
      locationImg: locationImg,
      starImg: starImg,
      postTime: postTime
    }) => ({
      event,
      word,
      time,
      star,
      img,
      place,
      locationImg,
      starImg,
      postTime,
      type: "official"
    }));
    var all = []
    if(stars.length === 0){
      all = [{title: "Your History", data: newPersonal}];
      setOfficial("")
      setLocationImg("")
    }else if(personal.length === 0){
      all = [{title: "Official Events", data: newStars}];
      setLocationImg(locationImg);
      setOfficial(newStars[0].place);
    }else{
      all = [{title: "Official Events", data: newStars}, {title: "Your History", data: newPersonal}];
      setLocationImg(locationImg);
      setOfficial(newStars[0].place);
    }
    return all;
  }
  const sections = useMemo(() => filterLocation(chosenLocation), [chosenLocation]);

  const renderSectionHeader = useCallback(({section}) => (
    <Text style={styles.sectionHeader}>{section.title}</Text>
  ), []);

  const renderItem = useCallback(({item}) => (
    item.type === "official"?(
      <NewsCard
        star={item.star}
        starImg={item.starImg}
        postTime={null}
        playTime={item.time}
        title={item.event}
        img={item.img}
        onPress={ () => {
          //console.log(item)
          navigation.navigate('info',
          {
            star: item.star,
            starImg: item.starImg,
            postTime: item.postTime,
            playTime: item.time,
            title: item.event,
            info: item.word,
            img: item.img,
            place: item.place
          })}
        }
      />
    ):(
      <PinCard
        event={item.event}
        star={item.star}
        addr={null}
        time={item.time}
        img={item.img}
        info={item.word}
      />
    )
  ), []);

  const getAddress = async (latlng) => {
      Geocoder.from({ latitude: parseFloat(latlng.latitude), longitude: parseFloat(latlng.longitude) })
      .then((result) => {
          if (result.results[0]) {
            setAddress(result.results[0].formatted_address);
          } else {
            setAddress("");
          }
      })
  }

  const renderListHeader = useCallback(() => (
    <View>
      {official === "" ? (
        <></>
      ):(
        <Text style={styles.listHeader}>{official}</Text>
      )}
      {locationImg === "" ? (
        <></>
      ):(
        <Image style={styles.img} source={locationImg}/>
      )}
      <Text style={styles.address}>{address}</Text>
      {starmarkers.some(e => e.latlng.latitude == chosenLocation.latitude && e.latlng.longitude == chosenLocation.longitude) && getDistance(location, chosenLocation) < 500?
        (<GeneralButton
              buttonTitle="Add Official Pin"
              color={Colors.white}
              backgroundColor={Colors.primaryColor}
              aligned='center'
              width='100%'
              onPress={() => {
                navigation.navigate(
                  'AddPost',
                  {
                    location: chosenLocation,
                    liked: datas.slice(1),
                    type: 'official'
                  }
                );
              }}
            />
        ):(<></>)
      }
    </View>
  ), [official, address]);

  const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
        pressBehavior={'close'}
        opacity={0.2}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
			/>
		),
		[]
	);

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

  const renderPersonalMarker = async () => {
    const list = [];
    try {
      await firestore().collection('pins')
        .where('userID', '==', user.uid)
        .orderBy('postTime', 'desc')
        .get()
        .then((query) => {
          query.forEach((doc) => {
            const { caption, star, postTime, location, img } = doc.data();
            if (selectedStar === '全部' || star === selectedStar) {
              list.push({
                id: doc.id,
                postTime,
                caption,
                latlng: location,
                img,
                star,
              })
            }
          })
        })
      // console.log(list);
      setMarkers(list);
    } catch (e) {
      console.log(e)
    }
  }

  const renderStarMarker = async () => {
    const list = [];
    try {
      if(selectedStar === '全部'){
        await firestore().collection('news')
        .orderBy('playTime')
        .get()
        .then((query) => {
          query.forEach((doc) => {
            const { title, info, locationImg, img, star, starImg, playTime, postTime, location, place } = doc.data();
            if (datas.some(e => e.name == star)) {
              list.push({
                id: doc.id,
                title,
                info,
                locationImg,
                postTime,
                playTime,
                img,
                star,
                starImg,
                latlng: location,
                place,
              })
            }
          })
        })
      }else{
        await firestore().collection('news')
        .where('star', '==', selectedStar)
        .get()
        .then((query) => {
          query.forEach((doc) => {
            const { title, info, locationImg, img, star, starImg, playTime, postTime, location, place } = doc.data();
            list.push({
              id: doc.id,
              title,
              info,
              locationImg,
              postTime,
              playTime,
              img,
              star,
              starImg,
              latlng: location,
              place
            })
          })
        })
      }
      
      //console.log(list);
      setStarMarkers(list);
      if (loading) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchlikedStar();
    handleLocationPermission();
    curPos();
    navigation.addListener("focus", () => setBack(!back));
  }, [navigation, back])

  useEffect(() => {
    renderPersonalMarker();
    renderStarMarker();
  }, [datas, selectedStar])

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
                  latitudeDelta: 0.08,
                  longitudeDelta: 0.04,
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
                      onPress={(e) => {
                        setChosenLocation(e.nativeEvent.coordinate);
                        getAddress(e.nativeEvent.coordinate);
                        bottomSheetRef.current.snapToIndex(0);
                      }}
                      hideCallout
                    />
                  )))
                }
                {
                  starmarkers && (starmarkers.map(starmarker => (
                    <Marker
                      key={starmarker.id}
                      coordinate={starmarker.latlng}
                      pinColor={Colors.white}
                      onPress={(e) => {
                        setChosenLocation(e.nativeEvent.coordinate);
                        getAddress(e.nativeEvent.coordinate);
                        bottomSheetRef.current.snapToIndex(0);
                      }}
                      hideCallout
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
                    type: 'personal',
                  }
                );
              }}
            />
          </View>
          <BottomSheet
              ref={bottomSheetRef}
              index={-1}
              snapPoints={snapPoints}
              backdropComponent={renderBackdrop}
              enablePanDownToClose={true}
          >
            <BottomSheetSectionList
                sections={sections}
                ListHeaderComponent={renderListHeader}
                renderSectionHeader={renderSectionHeader}
                renderItem={renderItem}
                contentContainerStyle={styles.contentContainer}
            />
          </BottomSheet>
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
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 2,
  },
  address: {
    fontSize: 18
  },
  entry: {
    fontWeight: 'normal',
    fontSize: 16
  },
  listHeader: {
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 2,
  },
  img:{
    width: '100%',
    height: windowHeight / 3,
  },
  contentContainer:{
    marginHorizontal: 10,
  }
});