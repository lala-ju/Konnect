import { ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import StarCard from '../components/StarCard'

const FollowedStarScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safe}>
    <ScrollView>
      <StarCard
        starname="star1"
        img=""
        onPress={() => navigation.navigate('StarDetail',  {star: "star1"})}
      />
    </ScrollView>
    </SafeAreaView>
  )
}

export default FollowedStarScreen

const styles = StyleSheet.create({
  safe:{
    flex: 1,
  },
})