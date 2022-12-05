import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { TabRouter, useRoute } from "@react-navigation/native";
import { useEffect, useReducer, useState } from "react";
import Login from "./Login";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { set } from "../redux/userInfoSlice";
import userInfoSlice from "../redux/userInfoSlice";
import fetchGroupData, { groupList } from "../Components/fetchGroupData";
import Styles from "../Components/Styles";


export default function Home() {
  const route = useRoute();
  fetchGroupData();

  const renderScreen = () => {
  
    if (route) {
  

      return (

        <View style={Styles.groupButton}>
          <Button title = {groupList[0].groupName} color="#841584"></Button>
          <Button title = {groupList[1].groupName} backgroundColor = "#841584"></Button>
          <Button title = {groupList[2].groupName}></Button>
          <Button title = {groupList[3].groupName}></Button>
        </View>
      );
    } else {
      return <Login />;
    }
  };

  return renderScreen();
}
