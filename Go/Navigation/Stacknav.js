import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Home from '../Screens/Home';
import Map from '../components/Map';
import HomeLocation from '../SwipeScreen/HomeLocation';
import OfficeLocation from '../SwipeScreen/OfficeLocation';

import Tabnavigation from './Tabnavigation';
import { NavigationContainer ,DefaultTheme } from '@react-navigation/native';
import { createStackNavigator,TransitionPresets,CardStyleInterpolators} from '@react-navigation/stack';
import 'react-native-gesture-handler';

// const MyTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: 'blue',
//   },
// };


const Stack = createStackNavigator();

const Stacknav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabnavigation" screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerMode:"float"
      }}
      animation="fade"
      >
        <Stack.Screen
          name="Tabnavigation"
          component={Tabnavigation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Map" component={Map}
          options={{
          headerShown: false,
        }}
        />
        {/* Qickride screens */}
        <Stack.Screen name="HomeLocation" component={HomeLocation}
          options={{
          animationEnabled: true,
          headerShown: false,
        }}
        />
         <Stack.Screen name="OfficeLocation" component={OfficeLocation}
          options={{
          animationEnabled: true,
          headerShown: false,
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacknav;

const styles = StyleSheet.create({});
