import {SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../utils/Colors';
import AchievementCard from '../components/AchievementCard';
import DefaultProfileImage from '../assets/images/defaultProfile.png'

const AchievementScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safe}>
    <ScrollView>
      <AchievementCard
        starname="star1"
        days={1} 
        img=""
        onPress={() => navigation.navigate('AchieveStar', {star: "star1"})}
      />
    </ScrollView>
    </SafeAreaView>
  );
};

export default AchievementScreen;

const styles  = StyleSheet.create({
  safe:{
    flex: 1,
  },
})