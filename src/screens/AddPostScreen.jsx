import { View, Text, StyleSheet, TextInput, Alert, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import GeneralButton from '../components/GeneralButton'
import { Colors } from '../utils/Colors'
import {windowHeight} from '../utils/Dimension';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Geocoder from 'react-native-geocoding';
import {GOOGLE_MAPS_API_KEY} from '../utils/keys';
import { Dropdown } from 'react-native-element-dropdown';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';


Geocoder.init(GOOGLE_MAPS_API_KEY, {language:'en'});

//get from user followed stars
const data = [
    { label: 'Item 1'},
    { label: 'Item 2'},
    { label: 'Item 3'},
    { label: 'Item 4'},
    { label: 'Item 5'},
    { label: 'Item 6'},
    { label: 'Item 7'},
    { label: 'Item 8'},
];

const AddPostScreen = ({navigation, route}) => {
    const {user} = useContext(AuthContext);
    const location = route.params.location;
    const [address, setAddress] = useState(null);
    const [selectedStar, setSelected] = useState(null);
    const [post, setPost] = useState(null);

    const getAddress= async() => {
        Geocoder.from({latitude: parseFloat(location.latitude), longitude: parseFloat(location.longitude)})
        .then((result) =>{
            if(result.results[0]){
                setAddress(result.results[0].formatted_address);
                console.log(result.results[0].formatted_address);
            }else {
                console.log("no address found");
            }
        })
    }

    const submitPost = async() => {
        //must choose a star to post pin
        if(selectedStar === null){
            Alert.alert(
                'Fill the star',
                'You have to select a star to add your pin wtih.',
            );
            return;
        }

        firestore().collection('pins').add({
            userID: user.uid,
            caption: post,
            location: location,
            addr: address,
            star: selectedStar,
            postTime: firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
            console.log('post added');
            Alert.alert(
                'Pin Added !',
                'Your pin has been uploaded successfully.',
            );
            setupMicrotasks(null);
        })
        .catch((error) => {
            console.log('something wrong');
            console.log(error);
        });
    }

    useEffect(() => {
        getAddress();
    })

    return (
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
        <GeneralButton
            buttonTitle="Add Image"
            color={Colors.white}
            backgroundColor={Colors.lightgrey}
            aligned='center'
            onPress={() => {
            }}
        />
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
            data={data}
            maxHeight={200}
            labelField="label"
            valueField="label"
            placeholder="select idol"
            searchPlaceholder="Search..."
            value={selectedStar}
            onChange={item => {
                setSelected(item.label);
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
            onPress={() => {
                submitPost();
                navigation.navigate('MapPin')
            }}
        />
    </View>
    </ScrollView>
  )
}

export default AddPostScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'left',
        padding: 20,
    },
    caption:{
        justifyContent: 'center',
        alignItems: 'flex-start',
        fontSize: 16,
    },
    rowContainer:{
        marginTop: 5,
        marginBottom: 10,
        width: '90%',
        height: windowHeight / 15,
        borderWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.background,
        zIndex: 10,
    },
    info:{
        fontSize: 16,
        color: Colors.darkgrey,
    },
    dropdown: {
        width: '95%',
        height: 30,
        borderBottomColor: Colors.darkgrey,
        borderBottomWidth: 0.5,
    },
    icon: {
        marginRight: 8,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 28,
        height: 28,
    },
})