import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Appbar, Card,Provider,Modal ,Button} from 'react-native-paper'


const Group = () => {
  const [visible, setVisible] = React.useState(false);
  
  const showDot = () => setVisible(true);
  const hideDot = () => setVisible(false);

  return (
   <Provider>
     
      <Modal visible={!visible} >
        <Text>Example Modal.  Click outside this area to dismiss.</Text>
      </Modal>
     
      <Appbar.Header>
      <Appbar.BackAction />
      <Appbar.Content title="Verify Profile"/>
        <Appbar.Action icon="dots-vertical" onPress={visible? hideDot : showDot} />
    </Appbar.Header>
    </Provider>

    
  );
}




export default Group

const styles = StyleSheet.create({})