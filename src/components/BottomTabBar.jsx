import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AchievementScreen from '../screens/AchievementScreen';
import AccountScreen from '../screens/AccountScreen';
import MapScreen from '../screens/MapScreen';
import ExploreScreen from '../screens/ExploreScreen';
import { Colors } from '../utils/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  return (
    <Tab.Navigator screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.primaryColor,
        tabBarInactiveTintColor: Colors.grey,
        tabBarStyle: {
          height: 60,
        },
    })}>
      <Tab.Screen 
        key = {1}
        name={'Home'}
        component={HomeScreen} 
        options={{
            tabBarIcon: ({color, focused}) => (
                <MaterialCommunityIcons 
                name={focused? 'star': 'star-outline'}
                size={25}
                color={color}
                />
            ),
        }}
      />
      <Tab.Screen 
        key = {2}
        name={'Explore'}
        component={ExploreScreen}
        options={{
            tabBarIcon: ({color, focused}) => (
                <Ionicons
                name={focused? 'search': 'search-outline'}
                size={25}
                color={color}
                />
            ),
        }}
      />
      <Tab.Screen 
        key = {3}
        name={'Map'}
        component={MapScreen}
        options={{
                tabBarIcon: ({color, focused}) => (
                    <MaterialCommunityIcons
                    name={focused? 'map-marker': 'map-marker-outline'}
                    size={28}
                    color={color}
                    />
                ),
            }}
      />
      <Tab.Screen
        key = {4}
        name={'Achievement'}
        component={AchievementScreen}
        options={{
            tabBarIcon: ({color, focused}) => (
                <Ionicons
                name={focused? 'trophy': 'trophy-outline'}
                size={25}
                color={color}
                />
            ),
        }}
      />
      <Tab.Screen 
        key = {5}
        name={'Account'}
        component={AccountScreen}
        options={{
            tabBarIcon: ({color, focused}) => (
                <MaterialCommunityIcons
                name={focused? 'account': 'account-outline'}
                size={25}
                color={color}
                />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabBar;