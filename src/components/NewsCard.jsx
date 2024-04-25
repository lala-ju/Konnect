import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import DefaultProfileImage from '../assets/images/defaultProfile.png'
import { Colors } from '../utils/Colors'
import {windowHeight} from '../utils/Dimension';
import moment from 'moment'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const getTime = (timestamp, option) => {
  var cur = moment();
  var temp = moment(timestamp);
  var diff = cur.diff(temp, 'days');
  if(option === 0){
    return temp.format('MM-DD-YYYY');
  }else{
    if(diff > 3 || diff < -3){
      return temp.format('MM-DD-YYYY');
    }else{
      return temp.fromNow();
    }
  }
}

const NewsCard = ({
  star,
  starImg,
  postTime,
  playTime,
  title,
  img,
  ...rest
}) => {
  return (
    <TouchableOpacity style={styles.card}{...rest}> 
        <View style={styles.rowContainer}>
            <Image
            style = {styles.starImg}
            source = {{uri: starImg === "" || starImg === null ? Image.resolveAssetSource(DefaultProfileImage).uri: starImg }}
            />
            <View>
            <Text style={styles.starTitle}>
                {star}
            </Text>
            {postTime === null? (
              <></>
            ):(
              <Text style={styles.postTime}>
                posted {getTime(postTime.toDate(), 1)}
              </Text>
            )}
            </View>
        </View>
        <View style={styles.textbox}>
            <Text style={styles.info}>
                {getTime(playTime.toDate(), 0)} {title}
            </Text>
        </View>
        {img === "" || img === null? (
            <></>
        ): (
            <Image
            style = {styles.img}
            source = {{uri: img}}
            />
        )}
    </TouchableOpacity>
  )
}

export default NewsCard

const styles = StyleSheet.create({
  card:{
      width: '100%',
      borderRadius: 3,
      backgroundColor: Colors.lightgrey,
      content: 'fill',
      marginBottom: 10,
  },
  rowContainer:{
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderColor: Colors.darkgrey,
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
  postTime:{
    fontSize: 16,
    color: Colors.darkgrey,
    marginLeft: 10,
  },
  img:{
    width: '100%',
    height: windowHeight / 3,
    marginVertical: 2,
  },
  textbox:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 2,
  },
  info:{
    marginLeft: 10,
    fontFamily: 'NotoSansTC-Regular', 
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontWeight: "800",
    fontSize: 18, 
    color: Colors.black,
  }, 
})