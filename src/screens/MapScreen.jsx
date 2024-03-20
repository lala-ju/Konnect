import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import Geolocation from "react-native-geolocation-service"
import { Colors } from '../utils/Colors';

const MapScreen = ({navigation}) => { 
  const [location, setLocation] = useState(null)
  
  const handleLocationPermission = async () => { // 👈
    let permissionCheck = '';
    if (Platform.OS === 'ios') {
      permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (permissionCheck === RESULTS.BLOCKED || permissionCheck === RESULTS.DENIED){
        const permissionRequest = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('location permission denied.');
      }
    }else if (Platform.OS === 'android') {
      permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (permissionCheck === RESULTS.BLOCKED || permissionCheck === RESULTS.DENIED){
        const permissionRequest = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('location permission denied.');
      }
    }
  };

  useEffect(() => {
    handleLocationPermission()
  }, [])

  useEffect(() => { // 👈
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
    console.log(location)
  }, [])

  return (
    <SafeAreaView style={styles.safe}>
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
            />
          )
        }
        <View style={styles.buttonContainer}>
        <Button
          title="Add Post"
          color={Colors.primaryColor}
          onPress={() => {
            navigation.navigate('AddPost', {location: location});
          }}
        />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  safe:{
    flex: 1,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer:{
    position: 'absolute',
    top: '95%',
    alignSelf: 'flex-end',
  },
});