import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native';
import moment from 'moment'
import DefaultProfileImage from '../assets/images/defaultProfile.png'
import { Colors } from '../utils/Colors'
import {windowHeight} from '../utils/Dimension';
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

const ActivityInfoScreen = ({navigation, route}) => {
    const starname = route.params.star;
    const starImg = route.params.starImg;
    const postTime = route.params.postTime;
    const playTime = route.params.playTime;
    const title = route.params.title;
    const detail = route.params.info;
    const img = route.params.img;
    const place = route.params.place;

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView style={styles.safe} contentContainerStyle={styles.scroll}>
                <View style={styles.main}>
                <View style={styles.rowContainer}>
                    <Image
                    style = {styles.starImg}
                    source = {{uri: starImg === "" || starImg === null ? Image.resolveAssetSource(DefaultProfileImage).uri: starImg }}
                    />
                    <View>
                    <Text style={styles.starTitle}>
                        {starname}
                    </Text>
                    <Text style={styles.postTime}>
                        posted {getTime(postTime.toDate(), 1)}
                    </Text>
                    </View>
                </View>
                <View style={styles.textbox}>
                    <Text style={styles.title}>
                        {getTime(playTime.toDate(), 0)} {title}
                    </Text>
                </View>
                <View style={styles.rowPlaceContainer}>
                    <MaterialCommunityIcons
                        name='map-marker'
                        size={25}
                        color={Colors.darkgrey}
                        style={styles.icon}
                    />
                    <Text style={styles.place}>
                        {place}
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
                <View style={styles.infobox}>
                    <Text style={styles.info}>
                        {detail}
                    </Text>
                </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ActivityInfoScreen;

const styles = StyleSheet.create({
    safe:{
        flex: 1,
    },
    scroll:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    main:{
        width: '90%',
    },
    rowContainer:{
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 0.2,
        borderColor: Colors.lightgrey,
    },
    rowPlaceContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderBottomWidth: 0.2,
        borderColor: Colors.lightgrey,
    },
    starImg:{
        height: 50,
        width: 50,
        borderWidth: 0.5,
        borderColor: Colors.darkgrey,
        borderRadius: 30,
        margin: 10,
    },
    starTitle:{
        fontFamily: 'NotoSansTC-Regular',  
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.darkgrey,
        marginLeft: 10,
    },
    postTime:{
        fontSize: 16,
        color: Colors.darkgrey,
        marginLeft: 10,
        marginBottom: 5,
    },
    place:{
        fontSize: 16,
        color: Colors.darkgrey,
        marginLeft: 5,
        marginBottom: 5,
    },
    textbox:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 2,
    },
    title:{
        fontFamily: 'NotoSansTC-Regular', 
        fontWeight: "bold",
        fontSize: 18, 
        color: Colors.black,
    }, 
    img:{
        width: '100%',
        height: windowHeight / 2,
        marginVertical: 1,
    },
    info:{
        fontFamily: 'NotoSansTC-Regular', 
        fontSize: 16, 
        color: Colors.black,
    }, 
    infobox:{
        width: '100%',
        justifyContent: 'flex-start',
        marginHorizontal: 5,
    },
    icon: {
        marginLeft: 20,
        marginBottom: 5,
    }
})
