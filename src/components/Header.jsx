import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../utils/Colors';
import konnectLogo from '../assets/images/konnectlogo.png'

const Header = () => {
  return (
    <View style={styles.container}>
        <Image source={konnectLogo} style={styles.logoStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
    logoStyle:{
        height:25,
        width: 130,
    },
    container:{
        backgroundColor: Colors.white,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

export default Header;