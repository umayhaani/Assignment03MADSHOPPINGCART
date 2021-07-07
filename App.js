import React, { useState } from "react";

import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";
import EditModal from "./components/EditModal";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  const [doEdit, setdoEdit] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const [delAll, setdelAll] = useState(false);

  const [editId, setEditId] = useState("");
  const [editItem, setEditItem] = useState("");

  const addGoalHandler = (goalTitle) => {
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle },
    ]);
    setIsAddMode(false);
    setdelAll(false);
  };

  const removeGoalHandler = (goalId) => {
    //console.log("deleted....", goalId);
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal, index) => goal.id !== goalId);
    });
  };

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  };

  ///for editing purpose////////////////////
  const editHandler = (item) => {
    setEditId(item.id);
    setEditItem(item.value);
    setdoEdit(true);
  };

  const goalInputHandler = (enteredText) => {
    setEditItem(enteredText);
  };

  const addEditHandler = () => {
    const newData = courseGoals.map((item) => {
      if (item.id === editId) {
        item.value = editItem;
        // return item;
      }
      return item;
    });
    setCourseGoals(newData);
    setdoEdit(false);
    setIsRender(!isRender);
  };
  ///////////////////////////////////////////
  const deleteAllHandler = () => {
    const delAll = () => {
      setCourseGoals([]);
      setdelAll(true);
    };
    Alert.alert("ARE YOU SURE?", "pressing OK will delete items permanently", [
      { text: "OK", onPress: () => delAll() },
      { text: "CANCEL", onPress: () => console.log("cancel is pressed") },
    ]);
  };

  return (
    <View style={styles.screen}>
      <EditModal
        visible={doEdit}
        goalInputHandler={goalInputHandler}
        addEditHandler={addEditHandler}
        editItem={editItem}
        onCancel={() => setdoEdit(false)}
      />
      <Button title="ADD NEW ITEM" onPress={() => setIsAddMode(true)} />
      <GoalInput
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalAdditionHandler}
      />
      {delAll ? (
        <Text style={styles.text}>ALL ITEMS DELELTED</Text>
      ) : (
        <SwipeListView
          data={courseGoals}
          extraData={isRender}
          renderItem={(itemData) => (
            <GoalItem
              id={itemData.item.id}
              //  onDelete={removeGoalHandler.bind(this, itemData.item.id)}
              // onDelete={() => removeGoalHandler(itemData.item.id)}
              onEdit={() => editHandler(itemData.item)}
              item={itemData.item.value}
            />
          )}
          renderHiddenItem={(items) => {
            return (
              <View
                style={{
                  width: "30%",
                  marginVertical: 12,
                }}
              >
                <Button
                  title="Delete"
                  color="red"
                  onPress={() => removeGoalHandler(items.item.id)}
                />
              </View>
            );
          }}
          leftOpenValue={70}
          previewRowKey={"1"}
          previewOpenValue={80}
          previewOpenDelay={3000}
          disableLeftSwipe={true}
          showsVerticalScrollIndicator={false}
          //style={{ flex: 1, paddingBottom: 30, marginBottom: 40 }}
        />
        // <FlatList
        //   keyExtractor={(item) => item.id}
        //   data={courseGoals}
        //   extraData={isRender}
        //   renderItem={(itemData) => (
        //     <GoalItem
        //       id={itemData.item.id}
        //       //  onDelete={removeGoalHandler.bind(this, itemData.item.id)}
        //       // onDelete={() => removeGoalHandler(itemData.item.id)}
        //       onEdit={() => editHandler(itemData.item)}
        //       item={itemData.item.value}
        //     />
        //   )}
        // />
      )}
      {courseGoals.length > 1 && (
        <View style={styles.delBtn}>
          <Button title="DELETE ALL" onPress={deleteAllHandler} color="red" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
  editContainer: {
    flexDirection: "row",
  },
  editBtn: {
    marginLeft: "40%",
  },

  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    //height: 50,
    width: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
  button: {
    width: "40%",
  },

  text: {
    width: "70%",
    height: "70%",
    marginTop: "10%",
    textAlign: "center",
    marginLeft: "10%",
    fontWeight: "bold",
    fontSize: 15,
  },

  delBtn: {
    width: "40%",
    marginTop: 30,
  },
});
