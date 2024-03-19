import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBar from '../components/BottomTabBar';

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <BottomTabBar/>
  );
};

export default AppStack;