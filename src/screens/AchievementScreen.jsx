import {ScrollView } from 'react-native';
import React from 'react';
import { Colors } from '../utils/Colors';
import AchievementCard from '../components/AchievementCard';
import DefaultProfileImage from '../assets/images/defaultProfile.png'

const AchievementScreen = ({navigation}) => {
  return (
    <ScrollView>
      <AchievementCard
        starname="star1"
        days={1} 
        img=""
        onPress={() => navigation.navigate('AchieveStar', {star: "star1"})}
      />
    </ScrollView>
  );
};

export default AchievementScreen;