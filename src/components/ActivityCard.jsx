import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../utils/Colors'
import moment from 'moment'

const getTime = (timestamp) => {
    var cur = moment();
    var temp = moment(timestamp);
    return temp.format('MM-DD-YYYY');
}

const ActivityCard = ({
    playTime,
    title,
    place,
    ...rest
}) => {
  return (
    <TouchableOpacity style={styles.card}{...rest}>
        <View style={styles.textbox}>
            <Text style={styles.title}>
                {getTime(playTime.toDate())} {title}
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
    </TouchableOpacity>
  )
}

export default ActivityCard

const styles = StyleSheet.create({
    card:{
        width: '100%',
        borderRadius: 3,
        backgroundColor: Colors.lightgrey,
        marginBottom: 10,
    },
    textbox:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginVertical: 2,
    },
    title:{
        fontFamily: 'NotoSansTC-Regular', 
        fontWeight: "bold",
        fontSize: 18, 
        color: Colors.black,
        marginLeft: 10,
        marginBottom: 2,
    },
    place:{
        fontSize: 16,
        color: Colors.darkgrey,
        marginLeft: 5,
        marginBottom: 5,
    },
    icon: {
        marginLeft: 10,
        marginBottom: 5,
    },
    rowPlaceContainer:{
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderBottomWidth: 0.2,
        borderColor: Colors.lightgrey,
    },
})