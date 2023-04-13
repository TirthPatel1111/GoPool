import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View,Button} from "react-native";

const Ride = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Button
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
              title="Press Me"
            >
              Press Me
            </Button>
          </View>
        </View>
      </Modal>
      <Button
        style={[ styles.button, styles.buttonOpen ]}
        onPress={() => setModalVisible(true)}
        title="Press Me"
       >
        Press
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
   
    justifyContent: "center",
    alignItems: "center",
   
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "blue",
   
   
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    // marginBottom: 15,
    textAlign: "center"
  }
});

export default Ride;