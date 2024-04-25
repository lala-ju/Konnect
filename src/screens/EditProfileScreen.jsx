import { View, Text, StyleSheet, Image, Alert, SafeAreaView, TouchableOpacity, Modal, Platform, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import FormInput from '../components/FormInput';
import GeneralButton from '../components/GeneralButton';
import firestore from '@react-native-firebase/firestore';
import { Colors } from '../utils/Colors';
import { AuthContext } from '../navigation/AuthProvider';
import DefaultProfileImage from '../assets/images/defaultProfile.png'
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { windowHeight, windowWidth } from '../utils/Dimension';

const EditProfileScreen = ({navigation, route}) => {
  const {user} = useContext(AuthContext);
  const [username, setUsername] = useState(route.params.data.username);
  const [bio, setBio] = useState(route.params.data.bio);
  const [image, setImage] = useState(route.params.data.userImg);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: windowWidth / 1.5,
      height: windowWidth / 1.5,
      cropping: true,
      cropperCircleOverlay: true,
    }).then((image) => {
      //console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
    //console.log(image);
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: windowWidth / 1.5,
      height: windowWidth / 1.5,
      cropping: true,
      cropperCircleOverlay: true
    }).then((image) => {
      //console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const updateProfile = async() => {
    await firestore().collection('users').doc(user.uid)
    .update({
      username: username,
      bio: bio,
      userImg: await uploadImage(),
    })
    .then(() => {
      Alert.alert(
        'Profile Updated!',
        'Your profile has been updated successfully.'
      );
      navigation.goBack();
    })
    .catch((error) => {
      //console.log('something wrong');
      console.log(error);
    });
  }

  const uploadImage = async() => {
    if(image == null){
        return null;
    }

    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setLoading(true);
    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    try {
        await task;
  
        const url = await storageRef.getDownloadURL();
  
        setLoading(false);
        setImage(null);
        return url;
  
    } catch (e) {
        console.log(e);
        return null;
    }
  }


  useEffect(() => {
    navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading]);

  return (
    <SafeAreaView style={styles.safe}>
    {loading? (
      <View style={styles.load}>
        <ActivityIndicator size="large" />
      </View>
    ): (
      <View style = {styles.container}>
        <TouchableOpacity 
          style={styles.imgContainer}
          onPress={() => {
            setModalVisible(true)
          }}>
          <Image
            style = {styles.userImg}
            source = {{uri: image? image : Image.resolveAssetSource(DefaultProfileImage).uri}}
          />
          <Text style={styles.edit}>
            Edit Profile Picture
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="none"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
              //Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
          }}>
          <View style={styles.load}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select Image from ...</Text>
            <GeneralButton
                buttonTitle="Storage"
                color={Colors.white}
                backgroundColor={Colors.lightgrey}
                aligned='center'
                width='50%'
                onPress={() => {
                    setModalVisible(!modalVisible);
                    choosePhotoFromLibrary();
                }}
            />
            <GeneralButton
                buttonTitle="Camera"
                color={Colors.white}
                backgroundColor={Colors.lightgrey}
                aligned='center'
                width='50%'
                onPress={() => {
                    setModalVisible(!modalVisible)
                    takePhotoFromCamera();
                }}
            />
            <GeneralButton
                buttonTitle="Cancel"
                color={Colors.darkgrey}
                backgroundColor={Colors.white}
                aligned='center'
                width='30%'
                onPress={() => {
                    setModalVisible(!modalVisible)
                }}
            />
          </View>
          </View>
        </Modal>
        <FormInput
          labelValue={username}
          onChangeText={(newUsername) => setUsername(newUsername)}
          placeholderText= {username ? username : "username"}
          iconType="pencil"
        />
        <FormInput
          labelValue={bio}
          onChangeText={(newBio) => setBio(newBio)}
          placeholderText= {bio ? bio : "bio"}
          iconType="clipboard-outline"
        />
        <View>
          <GeneralButton
            buttonTitle="Update"
            color={Colors.white}
            backgroundColor={Colors.primaryColor}
            aligned='center'
            width='100%'
            onPress={() => updateProfile()}
          />
        </View>
    </View>
    )}
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
  load: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  userImg: {
    height: windowWidth / 2,
    width: windowWidth / 2,
    borderRadius: 100,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  imgContainer:{
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontFamily: 'NotoSansTC-Regular',  
    fontSize: 16,
    marginBottom: 2,
    textAlign: 'center',
  },
  edit:{
    fontFamily: 'NotoSansTC-Regular',  
    fontSize: 16,
  }
});

export default EditProfileScreen;