import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Colors } from '../utils/Colors'
import {windowHeight} from '../utils/Dimension';
import DefaultProfileImage from '../assets/images/defaultProfile.png'

const StarCard = ({
    starname, 
    img,
    ...rest
}) => {
    return (
        <TouchableOpacity style={styles.card}{...rest}>
            <View style={styles.rowContainer}>
                <Image
                style = {styles.starImg}
                source = {{uri: img? img: Image.resolveAssetSource(DefaultProfileImage).uri}}
                />
                <Text style={styles.starTitle}>
                    {starname}
                </Text>
            </View>
        </TouchableOpacity>
      )
};

export default StarCard;

const styles = StyleSheet.create({
    card:{
        marginTop: 10,
        width: '100%',
        height: windowHeight / 8,
        padding: 10,
        borderRadius: 3,
    },
    rowContainer:{
        alignItems: 'center',
        flexDirection: 'row',
    },
    starImg:{
        height: windowHeight / 10,
        width: windowHeight / 10,
        borderWidth: 0.5,
        borderColor: Colors.darkgrey,
        borderRadius: 75,
    },
    starTitle:{
        fontFamily: 'NotoSansTC-Regular',  
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.black,
        marginLeft: 20,
    },
})