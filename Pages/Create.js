import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View,TextInput, Button } from "react-native";
import { TabRouter, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Login from "./Login";
import React from "react";
import fetchGroupData, { groupList } from "../Components/fetchGroupData"
import Styles from "../Components/Styles";
import { useSelector, useDispatch } from "react-redux";
export default function Create() {
  const route = useRoute();
  const [userData, setUserData] = React.useState();
  const [gName, nRequest] = useState('');
  const [gTag, tRequest] = useState('');
  const [gTag2, tRequest2] = useState('');
  const [gLocation, lRequest] = useState('');
  const userInfo = useSelector((state) => state.userInfo.value);
  useEffect(() => {
    
    fetchGroupData();
  }, []);

  const createGroup = async () => {

    var newGroup=
    {
     "groupName": gName,
    "tags": [gTag, gTag2],
    "owner": userInfo.payload.name,
    "location": gLocation,
    "groupID": Math.random().toString(36).slice(2),
    "members": []
    };

    console.log(userInfo.payload.name)
    
    const newGrp = await fetch("https://groupie-backend.herokuapp.com/addGroup", {
      method: "POST",
      body: JSON.stringify(newGroup),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })

    newGrp.json().then(data => {
      console.log(data);
      if(data.status == 201) {
        alert("group successfully created")

      }else{
        alert(`${data.error}`)

      }
    })



  }


  const renderScreen = () => {
    let userData = userInfo.payload;
    
    if (route) {

      return (
        
        <View style={Styles.container}>
          <TextInput value = {gName} onChangeText={(gName) => nRequest(gName)}style= {{backgroundColor: 'gray',marginTop: 20,width: 200,height:30}}/>
            <Text style={Styles.nameText}>Group name</Text>
            <TextInput value = {gTag} onChangeText={(gTag) => tRequest(gTag)}style= {{backgroundColor: 'gray',marginTop: 20,width: 200,height:30}}/>
            <Text style={Styles.nameText}>Apply primary tag</Text>
            <TextInput value = {gTag2} onChangeText={(gTag2) => tRequest2(gTag2)}style= {{backgroundColor: 'gray',marginTop: 20,width: 200,height:30}}/>
            <Text style={Styles.nameText}>Apply additional tag</Text>
            <TextInput value = {gLocation} onChangeText={(gLocation) => lRequest(gLocation)}style= {{backgroundColor: 'gray',marginTop: 20,width: 200,height:30}}/>
            <Text style={Styles.nameText}>Location</Text>  
          <Text style={Styles.title}>{userData.given_name}</Text>
          
          <Button
           title = {"create group!"}
            color="#841584"
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

/*after kerrick done

var newGroup=
{
  "_id": [gName],
  "tags": [history, maath],
  "owner": [userData.given_name],
  "location": [mooon]
};


*/