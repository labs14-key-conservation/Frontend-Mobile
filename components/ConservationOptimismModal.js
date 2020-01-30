import React, { useState } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet
} from "react-native";

const ConservationOptimismModal = props => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.isModalVisible}
      onRequestClose={() => props.setIsModalVisible(false)}
    >
      <View style={styles.background}>
        <View style={styles.modal}>
          <TouchableHighlight
            style={{ alignItems: "flex-end" }}
            onPress={() => {
              props.setIsModalVisible(false);
            }}
          >
            <Text>X</Text>
          </TouchableHighlight>
          <Text style={{ fontSize: 16, marginBottom: 15 }}>
            Practicing Conservation Optimism means that you will help promote
            messages of hope instead of negativity while using the Key
            Conservation app.
          </Text>
          <Text style={{ fontSize: 16 }}>
            We know there will be trying days and bad things will happen but we
            can still be hopeful that we can make a difference. This means you
            will be honest about what is happening in your posts but you will
            also provide steps for supporters to give help and ideas so the
            situation can be fixed or stop from occurring again.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8
  },
  background: {
    flex: 1,
    height: 200,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  }
});

export default ConservationOptimismModal;
