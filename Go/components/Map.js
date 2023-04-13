import { StyleSheet, Text, View ,Button} from 'react-native';
import React,{useEffect,useState} from 'react';
import tw from 'twrnc';
import MapView,{Marker} from 'react-native-maps';
import { IconButton } from 'react-native-paper';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
// import * as Location from 'expo-location';

// import { useSelector } from 'react-redux';
// import { selectOrigin } from '../slices/navSlice';

const Map = () => {
  const navigation = useNavigation();

  const [mapRegion, setMapRegion] = useState({
    latitude: 23.0202434,
    longitude: 72.5797426,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const [mapDestination, setMapDestination] = useState({
    latitude: 22.5570015,
    longitude: 72.9364234,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  // const userLocation = async () => {
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== 'grated') {
  //     setErrorMsg('Permission to access location is denied.')
  //   }
  //   let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
  //   setMapRegion({
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta:0.0421,
  //   });
  //   console.log(location.coords.latitude, location.coords.longitude);
  // }

  // useEffect(() => {
  //   userLocation(); 
  // }, [] );


  return (
    <>
      <IconButton
        style={tw`absolute z-10 bg-white top-10`}
        icon="keyboard-backspace"
        iconColor="black"
        size={20}
        onPress={() => navigation.navigate('Home')}
      />

      <MapView
        style={tw`h-1/2`}
        region={mapRegion}
      >
        <Marker coordinate={mapRegion} title='Marker' />
        <Marker coordinate={mapDestination} title='Marker' />
        
      </MapView>
    </>
  );
};

export default Map;

const styles = StyleSheet.create({});
