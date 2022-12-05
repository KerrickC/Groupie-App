import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList } from "react-native";
import { TabRouter, useRoute } from "@react-navigation/native";
import { useEffect, useReducer, useState } from "react";
import Login from "./Login";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { set } from "../redux/userInfoSlice";
import userInfoSlice from "../redux/userInfoSlice";
import fetchGroupData, { groupList } from "../Components/fetchGroupData";
import Styles from "../Components/Styles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {

  const route = useRoute();

  const [groups, setGroups] = React.useState();

  const userInfo = useSelector((state) => state.userInfo.value);

  const myRnId = () => parseInt(Date.now() * Math.random());

  async function addUserToGroup(groupName) {
      const addUser = await fetch(
        `https://groupie-backend.herokuapp.com/addUserToGroup/${groupName}`, {
          method: "POST",               
          body: JSON.stringify({email: userInfo.payload.email}),               
          headers: {                 
            "Content-type": "application/json; charset=UTF-8",               
          },
        }
      );
      addUser.json().then((data)=>{console.log(data)})
  }
  useEffect(() => {
    async function fetchData() {
      const groups = await fetch(
        "https://groupie-backend.herokuapp.com/getAllGroups"
      );
      groups.json().then((data) => {
        console.log(data);
        setGroups(data.data);
      });
    }
    fetchData();
  }, []);
  const renderScreen = () => {
    if (route) {
      return (
        <SafeAreaView>
        <View >
          <FlatList 
              data={groups}
              keyExtractor={(item, index) => { return item.groupID}}
              renderItem={({item, index}) => (
                <View style={styles.container}>
                  <Text style={styles.title}>{item.groupName} {'\n'}</Text>
                  <View style={styles.tagContainter}>
                  <View style={styles.row}>
                    {item.tags.map((tag, i) => (
                      <View style={styles.tag}>
                        <Text key={myRnId} style={styles.textButton}>{tag}{'  '}</Text>
                      </View>
                    ))}
                    </View>
                    <Text style={styles.text}>Location:  {item.location}</Text>
                    </View>
                    <TouchableOpacity onPress={() => addUserToGroup(item.groupName)} 
                      style={styles.button}>
                        <Text style={styles.textButton}>Join</Text>
                    </TouchableOpacity>
                  
                 
                </View>
              )}
          />
        </View>
        </SafeAreaView>
      );
    } else {
      return <Login />;
    }
  };

  return renderScreen();
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 5,
    borderRadius:5
  },
  row: {
    flexDirection: "row",
    alignItem: "center"
  },
  tagContainter: {
    flexDirection:"column",
    alignSelf: "flex-start",
    justifyContent: "center",
    marginLeft: 20,
    
  },
  tag: {
    backgroundColor: "#dcdcdc",
    marginRight: 5,
    padding: 3,
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 5
  },
  text: {
    fontSize: 15,
    color: "#4b0082",
  },
  title: {
    color: "#9370DB",
    textAlign: "left",
    paddingTop: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#9370DB",
    padding: 5,
    borderRadius:7,
    marginBottom: 20,
    alignSelf: "flex-end",
    marginRight: 20
  },
  textButton: {
    color:"#FFFFFF",
    marginLeft: 5,
    marginRight: 5,
    shadowColor: "#F0FFFF",
    fontWeight: "bold",
    fontSize: 15
  }
});

