import { View, Image } from 'react-native';
import React from 'react';
import { Colors } from '../utils/Colors';
import AchievementCard from '../components/AchievementCard';
import DefaultProfileImage from '../assets/images/defaultProfile.png'

const AchievementScreen = ({navigation}) => {
  return (
    <View>
      <AchievementCard
        starname="star1"
        days={1} 
        img=""
        onPress={() => navigation.navigate('AchieveStar')}
      />
    </View>
  );
};

export default AchievementScreen;