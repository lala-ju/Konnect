import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { windowHeight } from '../utils/Dimension';
import DefaultProfileImage from '../assets/images/defaultProfile.png'


const StarScreen = ({navigation, route}) => {
    const starid = route.params.star;

    return (
        <View style={styles.container}>
           <Image
                style = {styles.starImg}
                source = {{uri: Image.resolveAssetSource(DefaultProfileImage).uri}}
            />
            <Text style={styles.starname}>
                {starid}
            </Text>
        </View>
    )
};

export default StarScreen;

const styles = StyleSheet.create({
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
    }
});