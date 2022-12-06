
import { StyleSheet, Text, View,TextInput, Button } from "react-native";
import { TabRouter, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Login from "./Login";
import React from "react";

import { useSelector, useDispatch } from "react-redux";
export default function Create() {
  const route = useRoute();
  const [gName, nRequest] = useState('');
  const [gTag, tRequest] = useState('');
  const [gTag2, tRequest2] = useState('');
  const [gLocation, lRequest] = useState('');
  const userInfo = useSelector((state) => state.userInfo.value);


  const createGroup = async () => {
    //grabs variables from the text input bars and initializes a new group
    var newGroup=
    {
     "groupName": gName,
    "tags": [gTag, gTag2],
    "owner": userInfo.payload.name,
    "location": gLocation,
    "groupID": Math.random().toString(36).slice(2),
    "members": []
    };

    
    //attempts to add the new group
    const newGrp = await fetch("https://groupie-backend.herokuapp.com/addGroup", {
      method: "POST",
      body: JSON.stringify(newGroup),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    // if the group does not share the same title as a previous one, then the group will be added
    newGrp.json().then(data => {
      if(data.code == "201") {
        alert("Group successfully created!")

      }
      //if it is a duplicate or does not have all of the required information, then it throws an error
      else{
        alert(`${data.error}`)


      }
    })



  }


  const renderScreen = () => {
    let userData = userInfo.payload;
    
    if (route) {


      return (
        //provides the layout of the textInput fields
        <View style={styles.container}>
          <TextInput value = {gName} onChangeText={(gName) => nRequest(gName)}style= {{backgroundColor: 'gray',marginTop: 20,width: 200,height:30}}/>
            <Text style={styles.nameText}>Group name</Text>
            <TextInput value = {gTag} onChangeText={(gTag) => tRequest(gTag)}style= {{backgroundColor: 'gray',marginTop: 20,width: 200,height:30}}/>
            <Text style={styles.nameText}>Apply primary tag</Text>
            <TextInput value = {gTag2} onChangeText={(gTag2) => tRequest2(gTag2)}style= {{backgroundColor: 'gray',marginTop: 20,width: 200,height:30}}/>
            <Text style={styles.nameText}>Apply additional tag</Text>
            <TextInput value = {gLocation} onChangeText={(gLocation) => lRequest(gLocation)}style= {{backgroundColor: 'gray',marginTop: 20,width: 200,height:30}}/>
            <Text style={styles.nameText}>Location</Text>  
          <Text style={styles.title}>{userData.given_name}</Text>
          
          <Button
           title = {"create group!"}
            color="#841584"
            //when the button is pressed, it calls createGroup and attempts to create a new group
            onPress={createGroup}
              
            
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
})