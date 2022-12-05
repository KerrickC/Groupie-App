import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { TabRouter, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Login from "./Login";
import React from "react";
import Styles from "../Components/Styles";
export default function Test() {
  const route = useRoute();
  const [sRequest, setRequest] = useState('');
  const [groups, setGroups] = React.useState();

  useEffect(() => {
  }, []);

  const renderScreen = () => {
    
    if (route) {
      return (
        <View style={Styles.container}>
          	<TextInput 
              value = {sRequest}
              onChangeText={(sRequest) => setRequest(sRequest)}
              style= {{
              backgroundColor: 'gray',
              marginTop: 20,
              width: 200,
             height:30
            }}/>
            {sRequest!= ''? <Text>
             Find results for: {sRequest}
              </Text>:null}
          <Text style={Styles.title}>{"bich"}</Text>
        </View>
      );
    } else {
      return <Login />;
    }
  };

  return renderScreen();
}

