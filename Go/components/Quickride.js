import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { Button, Text } from 'react-native-paper';
import { useBottomSheet } from '@gorhom/bottom-sheet';

const data = [
  {
    id: '123',
    title: 'Go to Home',
    loc: 'Gandhinagar',
    dest: 'Anand',
    screen: 'Map',
    Icon: 'home',
    swipescreen:'HomeLocation'
    // lan: 26.848623,
    // lon: 80.8024264,
  },
  {
    id: '456',
    title: 'Go to Office',
    loc: 'Anand',
    dest: 'Gandhinagar',
    screen: 'Map ',
    Icon: 'building',
    swipescreen:'OfficeLocation'
  },
];

const Poolnav = (props) => {
  const navigation = useNavigation();
 
  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.screen, item)} //MapScreen
            style={tw`p-2 bg-blue-200 rounded-xl h-25 mx-3 my-2 flex-row`}
          >
            <View style={tw`m-3`}>
              <Icon style={tw`h-15 w-15 justify-center rounded-full bg-gray-100`}
                name={item.Icon}
                type="font-awesome-5"/>
            </View>
            {/* title */} 

            <View style={tw`w-57`}>
              <View style={tw`flex-row justify-between items-center`}>
                <Text variant="headlineMedium" style={tw`text-base mb-2 font-bold text-lg`}>
                  {item.title}
                </Text>
                <Button
                  textColor="black"
                  icon="map-marker"
                  mode="elevated"
                  title="Add"
                  onPress={() => navigation.navigate(item.swipescreen, item)}
                >
                  Add
                </Button>
              </View>

              {/* content */}
              <View style={tw`flex-row justify-between mt-3`}>
                <Text>{item.loc}</Text>
                <Icon name="arrow-right" type="font-awesome-5" />
                <Text>{item.dest}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* temp view */}
      {/* <View style={styles.imgview}>
        <Image
          style={{
            height: 150,
            width: 150,
          }}
          source={require('../assets/Images/ubercar.png')}
        />
      </View> */}
    </>
  );
};

export default Poolnav;

const styles = StyleSheet.create({
  imgview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
