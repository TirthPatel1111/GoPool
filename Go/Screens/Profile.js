import { StyleSheet, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { TextInput, Avatar, Text } from 'react-native-paper';
import { Icon } from '@rneui/base';

const Profile = () => {
  return (
    <>
      <View style={[tw`h-2/5 rounded-b-2xl`, { backgroundColor: '#42A5F5' }]}>
      <Icon
          name="ellipsis-v"
          type="font-awesome-5"
          style={tw`relative left-40 m-2`}
          color="#ffff"
      />
      <View style={tw`top-9 items-center`}>
        <Avatar.Image size={120} source={require('../assets/Images/getpool.png')}/>
        <Text variant="titleLarge" style={tw`font-bold my-3 mx-2 text-white `}>Tushar</Text>
      </View>
    </View>
    <View style={tw`m-3`}>
        <Text variant="titleLarge" style={tw`font-bold`}>Verify your profile</Text>
    
    </View>
    </>
  )
}

export default Profile

const styles = StyleSheet.create({

})