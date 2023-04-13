import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import tw from 'twrnc';
import Home from './Screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Tabnavigation from './Navigation/Tabnavigation';
import Stacknav from './Navigation/Stacknav';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
   
      <Stacknav />
      
    // <NavigationContainer>
    //   <SafeAreaProvider>
    //     <Stack.Navigator>
    //       <Stack.Screen
    //         name="Tabnavigation"
    //         component={Tabnavigation}
    //       />
    //        <Stack.Screen
    //         name="Map"
    //         component={Map}
    //       />
    //     </Stack.Navigator>
    //     </SafeAreaProvider>
    //   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 
});
