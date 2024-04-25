import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native'
import React from 'react'
import { windowHeight } from '../utils/Dimension';
import DefaultProfileImage from '../assets/images/defaultProfile.png'
import { Colors } from '../utils/Colors';
import NumItemBox from '../components/NumItemBox';

const AchievementStarScreen = ({navigation, route}) => {
    const {name, official, personal, days} = route.params;
    return (
        <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
           <Image
                style = {styles.starImg}
                source = {{uri: Image.resolveAssetSource(DefaultProfileImage).uri}}
            />
            <Text style={styles.starname}>
                {name}
            </Text>
            <Text style={styles.info}>
                You have followed
            </Text>
            <Text style={styles.important}>
                {days} Days
            </Text>
            <View style={styles.center}>
                <Text style={styles.visit}>Visited Spots</Text>
                <View style={styles.rowContainer}>
                    <NumItemBox 
                        num = {official}
                        itemName="Official"
                    />
                    <NumItemBox 
                        num = {personal}
                        itemName="Personal"
                    />
                </View>
            </View>
        </View>
        </SafeAreaView>
    )
}

export default AchievementStarScreen

const styles = StyleSheet.create({
    safe:{
        flex: 1,
    },
    container:{
        marginTop: windowHeight/15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    starImg:{
        height: 150,
        width: 150,
        borderRadius: 75,
    },
    starname:{
        fontFamily: 'NotoSansTC-Regular',  
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: Colors.black,
    },
    info:{
        fontFamily: 'NotoSansTC-Regular', 
        fontSize: 16, 
        color: Colors.black,
    },
    important:{
        fontFamily: 'NotoSansTC-Regular', 
        fontSize: 18,
        fontWeight: 'bold', 
        color: Colors.black,
        marginBottom: 5,
    },
    center:{
        marginTop: 10,
        alignItems: 'center',
    },
    rowContainer:{
        flexDirection: 'row',
    },
    visit:{
        fontSize: 18,
    }
});