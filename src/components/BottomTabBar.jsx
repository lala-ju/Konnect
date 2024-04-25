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
import { View, Platform } from 'react-native';
import FollowedStarScreen from '../screens/FollowedStarScreen';
import PersonalPostScreen from '../screens/PersonalPostScreen';
import AddPostScreen from '../screens/AddPostScreen';
import AchievementStarScreen from '../screens/AchievementStarScreen';
import StarScreen from '../screens/StarScreen';
import ActivityInfoScreen from '../screens/ActivityInfoScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName='Account'>
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerTitle: "Profile",
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: Colors.background,
            elevation: 0,
          },
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
          headerTitle: 'All Pins',
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
        name="StarDetail"
        component={StarScreen}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
};

const MapStack = () => {
  return (
    <Stack.Navigator initialRouteName='MapPin'>
      <Stack.Screen
        name="MapPin"
        component={MapScreen}
        options={{
          headerTitle: "Map",
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: Colors.background,
            elevation: 0,
          },
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
      <Stack.Screen
        name="info"
        component={ActivityInfoScreen}
        options={{
          headerTitle: 'Activity Information',
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
  return (
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

const ExploreStack = () => {
  return (
    <Stack.Navigator initialRouteName='ExploreAll'>
      <Stack.Screen
        name="ExploreAll"
        component={ExploreScreen}
        options={{
          headerTitle: "Explore",
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: Colors.background,
            elevation: 0,
          },
        }}
      />
      <Stack.Screen
        name="StarDetail"
        component={StarScreen}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="info"
        component={ActivityInfoScreen}
        options={{
          headerTitle: 'Activity Information',
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

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='HomeAll'>
      <Stack.Screen
        name="HomeAll"
        component={HomeScreen}
        options={{
          headerTitle: "Home",
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: Colors.background,
            elevation: 0,
          },
        }}
      />
      <Stack.Screen
        name="info"
        component={ActivityInfoScreen}
        options={{
          headerTitle: 'Activity Information',
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

const BottomTabBar = () => {
  return (
    <Tab.Navigator 
    initialRouteName='Home'
      screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.primaryColor,
        tabBarInactiveTintColor: Colors.grey,
        tabBarStyle: {
          height: Platform.OS === 'android' ? 56 : 83,
        },
    })}>
      <Tab.Screen
        key={1}
        name={'Home'}
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'star' : 'star-outline'}
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        key={2}
        name={'Explore'}
        component={ExploreStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        key={3}
        name={'Map'}
        component={MapStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'map-marker' : 'map-marker-outline'}
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        key={4}
        name={'Achievement'}
        component={AchievementStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'trophy' : 'trophy-outline'}
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        key={5}
        name={'Profile'}
        component={ProfileStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'account' : 'account-outline'}
              size={30}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabBar;