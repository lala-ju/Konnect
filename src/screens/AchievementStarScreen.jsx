import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native'
import React from 'react'
import { windowHeight } from '../utils/Dimension';
import DefaultProfileImage from '../assets/images/defaultProfile.png'


const AchievementStarScreen = ({navigation, route}) => {
    const starid = route.params.star;
    return (
        <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
           <Image
                style = {styles.starImg}
                source = {{uri: Image.resolveAssetSource(DefaultProfileImage).uri}}
            />
            <Text style={styles.starname}>
                {starid}
            </Text>
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
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
});