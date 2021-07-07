import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const GoalItem = (props) => {
  //  onPress={props.onDelete={removeGoalHandler.bind(this, itemData.item.id)}
  return (
    <TouchableOpacity
      onPress={props.onEdit}
      style={{ backgroundColor: "grey" }}
    >
      <View style={styles.listItem}>
        <Text style={styles.text}>{props.item}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 4,
    marginLeft: 20,
    alignContent: "center",
  },
});

export default GoalItem;
