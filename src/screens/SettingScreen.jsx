import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';

const SettingScreen = () => {
  return (
    <SafeAreaView style={styles.safe}>
    <View style={styles.container}>
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
  container:{
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
})
