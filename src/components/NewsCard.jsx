import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import DefaultProfileImage from '../assets/images/defaultProfile.png'
import { Colors } from '../utils/Colors'
import {windowHeight} from '../utils/Dimension';


const NewsCard = ({
  star,
  starImg,
  info,
  img,
}) => {
  return (
    <View style={styles.card}> 
        <View style={styles.rowContainer}>
            <Image
            style = {styles.starImg}
            source = {{uri: starImg === ""? Image.resolveAssetSource(DefaultProfileImage).uri: starImg }}
            />
            <Text style={styles.starTitle}>
                {star}
            </Text>
        </View>
        {img === ""? (
            <></>
        ): (
            <Image
            style = {styles.img}
            source = {{uri: img}}
            />
        )}
        <View style={styles.textbox}>
            <Text style={styles.info}>
                {info}
            </Text>
        </View>
    </View>
  )
}

export default NewsCard

const styles = StyleSheet.create({
  card:{
      width: '100%',
      borderRadius: 3,
      //alignItems: 'center',
      backgroundColor: Colors.lightgrey,
      content: 'fill',
      marginBottom: 10,
  },
  rowContainer:{
    alignItems: 'center',
    flexDirection: 'row',
  },
  starImg:{
    height: 40,
    width: 40,
    borderWidth: 0.5,
    borderColor: Colors.darkgrey,
    borderRadius: 20,
    margin: 10,
  },
  starTitle:{
      fontFamily: 'NotoSansTC-Regular',  
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.darkgrey,
      marginLeft: 10,
  },
  img:{
    width: '100%',
    height: windowHeight / 3,
  },
  textbox:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  info:{
    marginLeft: 10,
    fontFamily: 'NotoSansTC-Regular', 
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 16, 
  }, 
})