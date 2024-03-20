import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safe}>
    <View>
      <Text>Home Screen</Text>
    </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safe:{
    flex: 1,
  },
})