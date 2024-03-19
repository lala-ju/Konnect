import { ScrollView } from 'react-native'
import React from 'react'
import StarCard from '../components/StarCard'

const FollowedStarScreen = ({navigation}) => {
  return (
    <ScrollView>
      <StarCard
        starname="star1"
        img=""
        onPress={() => navigation.navigate('StarDetail',  {star: "star1"})}
      />
    </ScrollView>
  )
}

export default FollowedStarScreen