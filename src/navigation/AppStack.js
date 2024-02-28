import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Main' component={MainScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default AppStack;