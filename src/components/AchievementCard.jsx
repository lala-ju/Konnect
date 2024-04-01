import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Colors } from '../utils/Colors'
import {windowHeight, windowWidth} from '../utils/Dimension';
import DefaultProfileImage from '../assets/images/defaultProfile.png'

const AchievementCard = ({
    starname, 
    days,
    img,
    ...rest
}) => {
  return (
    <TouchableOpacity style={styles.card}{...rest}>
        <View style={styles.rowContainer}>
            <Image
            style = {styles.starImg}
            source = {{uri: Image.resolveAssetSource(DefaultProfileImage).uri}}
            />
            <View style = {styles.subcontainer}>
                <Text style={styles.starTitle}>
                    {starname}
                </Text>
                <Text style={styles.followedDays}>
                    Followed {days} Days
                </Text>
            </View>
        </View>
    </TouchableOpacity>
  )
};

export default AchievementCard

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
    subcontainer:{
        marginLeft: windowWidth/15,
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    starTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.black,
        marginBottom: 5,
    },
    followedDays:{
        fontSize: 16,
        color: Colors.darkgrey,
    },
})