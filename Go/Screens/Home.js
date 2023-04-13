import {
  StyleSheet,
  View,
  Image,
  FlatList,
  SafeAreaView,
  Modal,
} from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import { Button } from '@rneui/themed';
import Poolnav from '../components/Poolnav';
import Quickride from '../components/Quickride';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import { Searchbar, Avatar, Provider, Text } from 'react-native-paper';
import { Input } from '@rneui/base';

const Home = () => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ['70%', '80%'], []);

  //serchbar
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query) => setSearchQuery(query);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    // <View style={tw`flex-1 m-10`}>
    //   <Button buttonStyle={{ width: 100 }} align="center"

    //     onPress={() => navigation.navigate('Map')}

    //   >Secondary</Button>
    // </View>

    <SafeAreaView style={{ flex: 1 }}>
  
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Image
          style={tw`h-70`}
          source={{
            // uri: 'https://t4.ftcdn.net/jpg/04/96/72/57/360_F_496725738_rLoyzy9qGeTUkqCVn5D7pW7ZA5ONiyiC.jpg',
            uri: 'https://jugnoo.io/wp-content/uploads/2021/06/Jugnoo-Carpool-Softwar-Owning-the-Drive-to-Owing-the-Ride.png',
          }}
        />

        <BottomSheet
          componentType="FlatList"
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
        >
          <BottomSheetScrollView style={tw`h-full`}>
            <View style={tw`ml-7 items-center flex-row`}>
              <Avatar.Image
                style={tw`mr-5`}
                size={50}
                source={{
                  uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
                }}
              />
              <Text variant="titleLarge" style={tw`font-bold`}>
                Welcome Tushar
              </Text>
            </View>

            <Searchbar
              icon="map-marker"
              style={tw`mx-4 my-3`}
              placeholder="Leving from"
              onChangeText={onChangeSearch}
            />

            <View style={tw`mt-2`}>
              <Poolnav />
            </View>

            {/* quick ride */}
            <View style={tw`mb-4`}>
              <Text variant="titleLarge" style={tw`m-3 font-extrabold`}>
                Get A Quickride
              </Text>
              <Quickride />
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Home;

//temp
const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: 'blue',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    // marginBottom: 15,
    textAlign: 'center',
  },
});
