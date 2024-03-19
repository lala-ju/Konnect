import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AchievementScreen from '../screens/AchievementScreen';
import MapScreen from '../screens/MapScreen';
import ExploreScreen from '../screens/ExploreScreen';
import { Colors } from '../utils/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/AccountScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SettingScreen from '../screens/SettingScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';
import FollowedStarScreen from '../screens/FollowedStarScreen';
import PersonalPostScreen from '../screens/PersonalPostScreen';
import AddPostScreen from '../screens/AddPostScreen';
import AchievementStarScreen from '../screens/AchievementStarScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileStack = () => {
  return(
  <Stack.Navigator initialRouteName='Account'>
      <Stack.Screen 
          name="Account"
          component={AccountScreen}
          options={{
            headerShown: false,
          }}
      />
      <Stack.Screen 
          name="EditProfile"
          component={EditProfileScreen}
          options={{
            headerTitle: 'Edit Profile',
            headerBackTitleVisible: true,
            headerBackTitle: 'back',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: Colors.background,
              elevation: 0,
            },
          }}
      />
      <Stack.Screen 
          name="Setting"
          component={SettingScreen}
          options={{
            headerTitle: 'Settings',
            headerBackTitleVisible: true,
            headerBackTitle: 'back',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: Colors.background,
              shadowColor: Colors.lightgrey,
              elevation: 0,
            },
          }}
      />
      <Stack.Screen 
          name="Followed"
          component={FollowedStarScreen}
          options={{
            headerTitle: 'Followed',
            headerBackTitleVisible: true,
            headerBackTitle: 'back',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: Colors.background,
              shadowColor: Colors.lightgrey,
              elevation: 0,
            },
          }}
      />
      <Stack.Screen 
          name="Posts"
          component={PersonalPostScreen}
          options={{
            headerTitle: 'All Posts',
            headerBackTitleVisible: true,
            headerBackTitle: 'back',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: Colors.background,
              shadowColor: Colors.lightgrey,
              elevation: 0,
            },
          }}
      />
  </Stack.Navigator>
  );
};

const MapStack = () => {
  return(
  <Stack.Navigator initialRouteName='MapPin'>
      <Stack.Screen 
          name="MapPin"
          component={MapScreen}
          options={{
            headerShown: false,
          }}
      />
      <Stack.Screen 
          name="AddPost"
          component={AddPostScreen}
          options={{
            headerTitle: 'AddPost',
            headerBackTitleVisible: true,
            headerBackTitle: 'back',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: Colors.background,
              elevation: 0,
            },
          }}
      />
  </Stack.Navigator>
  );
};

const AchievementStack = () => {
  return(
  <Stack.Navigator initialRouteName='AchieveAll'>
      <Stack.Screen 
          name="AchieveAll"
          component={AchievementScreen}
          options={{
            headerTitle: "Achievements",
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: Colors.background,
              elevation: 0,
            },
          }}
      />
      <Stack.Screen 
          name="AchieveStar"
          component={AchievementStarScreen}
          options={{
            headerTitle: "",
            headerTransparent: true
          }}
      />
  </Stack.Navigator>
  );
};

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
        component={MapStack}
        options={{
          unmountOnBlur: true,
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
        component={AchievementStack}
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
        name={'Profile'}
        component={ProfileStack}
        options={{
          unmountOnBlur: true,
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