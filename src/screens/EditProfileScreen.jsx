import { View, Text, StyleSheet, Image, Alert, SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import FormInput from '../components/FormInput';
import GeneralButton from '../components/GeneralButton';
import firestore from '@react-native-firebase/firestore';
import { Colors } from '../utils/Colors';
import { AuthContext } from '../navigation/AuthProvider';
import DefaultProfileImage from '../assets/images/defaultProfile.png'

const EditProfileScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);
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

  const updateProfile = async() => {
    await firestore().collection('users').doc(user.uid)
    .update({
      username: username? username : userData.username,
      bio: bio? bio : userData.bio,
    })
    .then(() => {
      Alert.alert(
        'Profile Updated!',
        'Your profile has been updated successfully.'
      );
    })
  }

  useEffect(() => {
    getUser();
    navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading]);

  return (
    <SafeAreaView style={styles.safe}>
    <View style = {styles.container}>
        <Image
          style = {styles.userImg}
          source = {{uri: userData? userData.userImg || Image.resolveAssetSource(DefaultProfileImage).uri : Image.resolveAssetSource(DefaultProfileImage).uri}}
        />
        <FormInput
          labelValue={username}
          onChangeText={(newUsername) => setUsername(newUsername)}
          placeholderText= {userData ? userData.username || "username" : "username"}
          iconType="pencil"
        />
        <FormInput
          labelValue={bio}
          onChangeText={(newBio) => setBio(newBio)}
          placeholderText= {userData ? userData.bio || "bio" : "bio"}
          iconType="clipboard-outline"
        />
        <View>
          <GeneralButton
            buttonTitle="Update"
            color={Colors.white}
            backgroundColor={Colors.primaryColor}
            aligned='center'
            onPress={() => updateProfile()}
          />
        </View>
    </View>
    </SafeAreaView>
  ); 
}

const styles = StyleSheet.create({
  safe:{
    flex: 1,
  },
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
});

export default EditProfileScreen;