import { StyleSheet } from 'react-native';
import React from 'react';
import Home from '../Screens/Home';
import Ride from '../Screens/Ride';
import Group from '../Screens/Group';
import Profile from '../Screens/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, PricingCard } from '@rneui/base';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const Tabnavigation = () => {
  return (
    <Tab.Navigator
     
      screenOptions={{
        style: {
          borderRadius: 50,
          height: 90,
       },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <Icon type="font-awesome-5" name="home" color="black" />
          ),
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
             headerShown:false,
        }}
      />
      <Tab.Screen
        name="Ride"
        component={Ride}
        options={{
          tabBarLabel: 'Ride',
          tabBarIcon: () => (
            <Icon type="font-awesome-5" name="car" color="black" />
          ),
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: '#6699ff',
          },
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="Group"
        component={Group}
        options={{
          tabBarLabel: 'Groups',
          tabBarIcon: () => (
            <Icon type="font-awesome-5" name="users" color="black" />
          ),
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          tabBarBadge:3,//changeble
          headerStyle: {
            backgroundColor: '#6699ff',
          },
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown:true,
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <Icon type="font-awesome-5" name="user" color="black" />
          ),
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: '#42A5F5',
            shadowOpacity:0,
          },
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabnavigation;

const styles = StyleSheet.create({});
