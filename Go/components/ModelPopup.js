import { StyleSheet, Text, View, Modal } from 'react-native'
import React,{useState} from 'react'


const ModelPopup = ({ visible, children }) => {
  return (
    <Modal
        animationType="slide"
        // transparent={false}
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
  )
}

export default ModelPopup

const styles = StyleSheet.create({})