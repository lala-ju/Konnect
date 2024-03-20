import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'

const PersonalPostScreen = () => {
  return (
    <SafeAreaView style={styles.safe}>
    <View>
      <Text>PersonalPostScreen</Text>
    </View>
    </SafeAreaView>
  )
}

export default PersonalPostScreen

const styles = StyleSheet.create({
  safe:{
    flex: 1,
  },
})