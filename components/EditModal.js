import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, Modal } from "react-native";

const EditModal = (props) => {
  return (
    <Modal visible={props.visible} animationType="slide">
      <Text style={styles.text}>Here You Can Edit Items</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={props.editItem}
          style={styles.input}
          onChangeText={props.goalInputHandler}
          value={props.editItem}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="SAVE"
              onPress={props.addEditHandler}
              color="#113880"
            />
          </View>
          <View style={styles.button}>
            <Button title="CANCEL" color="red" onPress={props.onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F788",
  },
  input: {
    borderColor: "black",
    color: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    marginTop: 20,
  },
  button: {
    width: "40%",
  },
  text: {
    marginTop: 50,
    //alignItems: "center",
    marginLeft: 60,
    fontWeight: "bold",
    fontSize: 40,
  },
});

export default EditModal;
