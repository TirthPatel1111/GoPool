import { StyleSheet,  View } from 'react-native'
import tw from 'twrnc'
import React from 'react'
import { Text ,IconButton} from 'react-native-paper'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native';

const HomeLocation = () => {
    const navigation = useNavigation();
    
    return (
    <View style={tw`bg-blue-200`}>
    <IconButton
        style={tw`absolute z-10 bg-white top-10`}
        icon="keyboard-backspace"
        iconColor="black"
        size={20}
        onPress={() => navigation.navigate('Home')}
      />

    <View style={tw`items-center h-full justify-center m-3`}>
       
       <Text variant="headlineSmall" style={tw`font-bold`}>Enter your Home Location</Text>
    </View>
   </View>
  )
}

export default HomeLocation

const styles = StyleSheet.create({})