import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: '123',
    title: 'Get a pool',
    // Image:
    //   'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1596627972/assets/e7/e861a8-30ec-4d57-8045-7186f6c5ec35/original/comfort.png',
    Image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1555367538/assets/31/ad21b7-595c-42e8-ac53-53966b4a5fee/original/Final_Black.png',
    screen: 'Map',
    // lan: 26.848623,
    // lon: 80.8024264,
  },
  {
    id: '456',
    title: 'Offer a pool',
    Image:
      'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1555367538/assets/31/ad21b7-595c-42e8-ac53-53966b4a5fee/original/Final_Black.png',
    screen: 'OfferPool',
  },
 
];

const Poolnav = () => {
  const navigation = useNavigation();

  return (
    <>
      <FlatList
        style={tw`p-3`}
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.screen, item)} //MapScreen
            style={tw`p-4 pt-4 bg-blue-200 m-2 rounded-xl h-55 shadow-blue-200 shadow-2xl`}
          >
            <View>
              <Image
                style={{ width: 120, height: 120, resizeMode: 'contain' }}
                source={{ uri: item.Image }}
              />
            </View>
            <Text style={tw`text-base text-center font-semibold`}>
              {item.title}
            </Text>
            <Icon
              name="arrow-circle-right"
              type="font-awesome-5"
              style={tw`pt-2`}
            />
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
  imgview:{
    flexDirection: "row",
    justifyContent:"space-between",
  }
});
