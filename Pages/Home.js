import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, Button} from "react-native";
import { TabRouter, useRoute } from "@react-navigation/native";
import { useEffect, useState} from "react";
import Login from "./Login";
import React from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const route = useRoute();

  const [groups, setGroups] = React.useState();

  const userInfo = useSelector((state) => state.userInfo.value);

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
        <View style={styles.container}>
          <FlatList 
              data={groups}
              keyExtractor={(item, index) => { return item.groupID}}
              renderItem={({item, index}) => (
                <View>
                  <Text style={styles.title}>{item.groupName}</Text>
                  {item.tags.map((tag, i) => (
                    <Text key={i}>{tag}</Text>
                  ))}
                  <Button onPress={()=>{addUserToGroup(item.groupName)}} title="Join">

                  </Button>
                  
                </View>
              )}
          />
        </View>
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
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center",
  },
});
