import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Colors } from '../utils/Colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment'
import { windowHeight, windowWidth } from '../utils/Dimension';

const getTime = (timestamp) => {
    var cur = moment();
    var temp = moment(timestamp);
    var diff = cur.diff(temp, 'days');

    if(diff > 3 || diff < -3){
        return temp.format('MM-DD-YYYY');
    }else{
        return temp.fromNow();
    }
}

const PinCard = ({
    event,
    star,
    addr,
    time,
    img,
    info,
}) => {
  return (
    <View style={styles.card}>
        {event === ''? (
            <></>
        ):(
            <Text style={styles.event}>
                {event}
            </Text>
        )}
        
        <View style={styles.subtitle}>
            <MaterialIcons
                name='people'
                size={25}
                color={Colors.darkgrey}
                style={styles.icon}
            />
            <Text style={styles.sub}>
                {star}
            </Text>
        </View>
        {addr === "" || addr === null? (
            <></>
        ):(
            <View style={styles.subtitle}>
                <MaterialCommunityIcons
                    name='map-marker'
                    size={25}
                    color={Colors.darkgrey}
                    style={styles.icon}
                />
                <Text style={styles.sub}>
                    {addr}
                </Text>
            </View>
        )}
        <View style={styles.subtitle}>
            <MaterialCommunityIcons
                name='clock-time-five-outline'
                size={25}
                color={Colors.darkgrey}
                style={styles.icon}
            />
            <Text style={styles.sub}>
                {getTime(time.toDate())}
            </Text>
        </View>
        {img === null || img === ""? (
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

export default PinCard

const styles = StyleSheet.create({
    card:{
        width: '100%',
        borderRadius: 3,
        alignItems: 'center',
        backgroundColor: Colors.lightgrey,
        content: 'fill',
        marginBottom: 10,
    },
    subtitle:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        content: 'fill',
    },
    event:{
        marginTop: 2,
        fontFamily: 'NotoSansTC-Regular', 
        fontWeight: 'bold' ,
        fontSize: 22, 
    },
    sub:{
        marginLeft: 10,
        fontFamily: 'NotoSansTC-Regular',  
        fontSize: 18,
    },
    img:{
        width: '100%',
        height: windowHeight / 3,
    },
    info:{
        marginLeft: 10,
        fontFamily: 'NotoSansTC-Regular', 
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        fontSize: 16, 
    }, 
    textbox:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 5,
    }
})