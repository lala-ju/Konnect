import { View, Text, StyleSheet, TextInput, Alert, ScrollView, SafeAreaView, ActivityIndicator, Modal, Platform, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import GeneralButton from '../components/GeneralButton'
import { Colors } from '../utils/Colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_MAPS_API_KEY } from '../utils/keys';
import { Dropdown } from 'react-native-element-dropdown';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import { windowHeight, windowWidth } from '../utils/Dimension';

Geocoder.init(GOOGLE_MAPS_API_KEY, { language: 'en' });

const AddPostScreen = ({ navigation, route }) => {
    const [datas, setDatas] = useState(route.params.liked);
    const { user } = useContext(AuthContext);
    const location = route.params.location;
    const [address, setAddress] = useState(null);
    const [selectedStar, setSelected] = useState(null);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);

    const getAddress = async () => {
        Geocoder.from({ latitude: parseFloat(location.latitude), longitude: parseFloat(location.longitude) })
        .then((result) => {
            if (result.results[0]) {
                setAddress(result.results[0].formatted_address);
                //console.log(result.results[0].formatted_address);
            } else {
                console.log("no address found");
            }
        })

        if(loading){
            setLoading(false);
        }
    }

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
          width: windowWidth,
          height: windowHeight / 3,
          cropping: true,
        }).then((image) => {
          console.log(image);
          const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
          setImage(imageUri);
        });
        console.log(image);
    };

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: windowWidth,
            height: windowHeight / 3,
          cropping: true,
        }).then((image) => {
          console.log(image);
          const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
          setImage(imageUri);
        });
    };

    const submitPost = async () => {
        //must choose a star to post pin
        if (selectedStar === null) {
            Alert.alert(
                'Fill the star',
                'You have to select a star to add your pin wtih.',
            );
            return;
        }

        const imageUrl = await uploadImage();
        //add pins data
        await firestore().collection('pins').add({
            userID: user.uid,
            caption: post,
            location: location,
            addr: address,
            star: selectedStar,
            postTime: firestore.FieldValue.serverTimestamp(),
            img: imageUrl,
        }).then(() => {
            //console.log('post added');
            Alert.alert(
                'Pin Added !',
                'Your pin has been uploaded successfully.',
            );
        })
        .catch((error) => {
            //console.log('something wrong');
            console.log(error);
        });
        //add increment to selected stars info
        console.log(datas);
        var renewData = datas
        if(selectedStar !== '個人'){
            for (var info of renewData) {
                if(info.name === selectedStar){
                    info.personal += 1
                }
            }
        }
        console.log(renewData);
        await firestore().collection('users').doc(user.uid)
        .update({
            likedStars: renewData.slice(1),
        })
        setDatas(renewData);
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
        getAddress();
    }, [navigation])

    return (
        <SafeAreaView style={styles.safe}>
        {loading? (
            <View style={styles.load}>
                <ActivityIndicator size="large" />
            </View>
        ):(
            <ScrollView>
                <View style={styles.container}>
                    <TextInput
                        style={styles.caption}
                        multiline={true}
                        numberOfLines={3}
                        placeholder="Write a caption"
                        placeholderTextColor={Colors.lightgrey}
                        onChangeText={(content) => setPost(content)}
                    />
                    <Modal
                        animationType="none"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() => {
                            // Alert.alert('Modal has been closed.');
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
                    {image === null? (
                        <GeneralButton
                        buttonTitle="Add Image"
                        color={Colors.white}
                        backgroundColor={Colors.lightgrey}
                        aligned='center'
                        width='100%'
                        onPress={() => {
                            setModalVisible(true)
                        }}
                        />
                    ):(
                        <Image
                            style = {styles.Img}
                            source = {{uri: image}}
                        />
                    )}
                    
                    <View style={styles.rowContainer}>
                        <MaterialCommunityIcons
                            name='map-marker'
                            size={25}
                            color={Colors.darkgrey}
                        />
                        <Text style={styles.info}>
                            {address}
                        </Text>
                    </View>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={datas}
                        maxHeight={200}
                        labelField="name"
                        valueField="name"
                        placeholder="select idol"
                        fontFamily='NotoSansTC-Regular'
                        value={selectedStar}
                        onChange={item => {
                            setSelected(item.name);
                        }}
                        renderLeftIcon={() => (
                            <MaterialCommunityIcons style={styles.icon} color={Colors.darkgrey} name="star" size={25} />
                        )}
                    />
                    <GeneralButton
                        buttonTitle="Post"
                        color={Colors.white}
                        backgroundColor={Colors.primaryColor}
                        aligned='center'
                        width='100%'
                        onPress={() => {
                            submitPost();
                            if(selectedStar !== null){
                                navigation.navigate('MapPin')
                            }
                        }}
                    />
                </View>
            </ScrollView>
        )}
        </SafeAreaView>
    )
}

export default AddPostScreen

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
        flex: 1,
        alignItems: 'left',
        padding: 20,
    },
    caption: {
        fontFamily: 'NotoSansTC-Regular',  
        justifyContent: 'center',
        alignItems: 'flex-start',
        fontSize: 16,
    },
    rowContainer: {
        marginTop: 5,
        marginBottom: 10,
        width: '90%',
        height: 60,
        borderWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    info: {
        fontFamily: 'NotoSansTC-Regular',  
        marginLeft: 5,
        fontSize: 16,
        color: Colors.darkgrey,
    },
    dropdown: {
        width: '95%',
        height: 40,
        borderBottomColor: Colors.darkgrey,
        borderBottomWidth: 0.5,
        justifyContent: 'center',
    },
    icon: {
        marginRight: 8,
    },
    placeholderStyle: {
        fontFamily: 'NotoSansTC-Regular',  
        fontSize: 16,
        marginBottom: 5,
    },
    selectedTextStyle: {
        fontFamily: 'NotoSansTC-Regular',  
        fontSize: 16,
        marginBottom: 5,
    },
    iconStyle: {
        width: 28,
        height: 28,
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
    Img:{
        width: '100%',
        height: windowHeight / 3,
        marginBottom: 15,
    }
})