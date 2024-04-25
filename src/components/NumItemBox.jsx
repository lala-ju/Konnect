import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../utils/Colors'
import { windowWidth } from '../utils/Dimension'

const NumItemBox = ({
    num,
    itemName, 
    ...rest
}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>
            {itemName}
        </Text>
        <Text style={styles.num}>
            {num}
        </Text>
    </View>
  )
}

export default NumItemBox

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 10,
    },
    num:{
        color: Colors.black,
        fontSize: 18,
    },
    text:{
        fontFamily: 'NotoSansTC-Regular', 
        color: Colors.darkgrey,
        fontSize: 16,
    },
})