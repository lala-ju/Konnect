import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, SafeAreaView, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from '../utils/Colors';
import { AuthContext } from '../navigation/AuthProvider';
import GeneralButton from '../components/GeneralButton';
import DefaultProfileImage from '../assets/images/defaultProfile.png'
import firestore from '@react-native-firebase/firestore';

const AccountScreen = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async() => {
    await firestore().collection('users').doc(user.uid).get()
    .then((documentSnapshot) => {
      if(documentSnapshot.exists){
        setUserData(documentSnapshot.data());
      }
    })
  }

  useEffect(() => {
    getUser();
    navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading]);

  return (
    <View style = {styles.container}>
        <Image
          style = {styles.userImg}
          source = {{uri: userData? userData.userImg || Image.resolveAssetSource(DefaultProfileImage).uri : Image.resolveAssetSource(DefaultProfileImage).uri}}
        />
        <Text style={styles.userName}>
          {userData ? userData.username || user.uid : user.uid} 
        </Text>
        <Text style={styles.bio}>
          {userData ? userData.bio || 'bio' : 'bio'}
        </Text>
        <View>
          <GeneralButton
            buttonTitle="Followed Stars"
            color={Colors.black}
            backgroundColor={Colors.background}
            aligned='left'
            onPress={() => {
              navigation.navigate('Followed');
            }}
          />
        </View>
        <View>
          <GeneralButton
            buttonTitle="Your Posts"
            color={Colors.black}
            backgroundColor={Colors.background}
            aligned='left'
            onPress={() => {
              navigation.navigate('Posts');
            }}
          />
        </View>
        <View>
          <GeneralButton
            buttonTitle="Edit Profile"
            color={Colors.darkgrey}
            backgroundColor={Colors.lightgrey}
            aligned='center'
            onPress={() => {
              navigation.navigate('EditProfile');
            }}
          />
        </View>
        <View>
          <GeneralButton
            buttonTitle="Settings"
            color={Colors.darkgrey}
            backgroundColor={Colors.lightgrey}
            aligned='center'
            onPress={() => {
              navigation.navigate('Setting');
            }}
          />
        </View>
        <View>
          <GeneralButton
            buttonTitle="Logout"
            color={Colors.white}
            backgroundColor={Colors.primaryColor}
            aligned='center'
            onPress={() => logout()}
          />
        </View>
    </View>
  ); 
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  bio: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.darkgrey,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default AccountScreen;