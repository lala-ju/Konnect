import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';

const SettingScreen = () => {
  return (
    <SafeAreaView style={styles.safe}>
    <View>
      <Text>SettingScreen</Text>
    </View>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  safe:{
    flex: 1,
  },
})
