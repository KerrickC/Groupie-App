import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TabRouter, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Login from "./Login";
import React from "react";

export default function Home() {
  const route = useRoute();

  const [groups, setGroups] = React.useState();

  useEffect(() => {
    async function fetchData() {
      const groups = await fetch(
        "https://groupie-backend.herokuapp.com/getAllGroups"
      );
      groups.json().then((data) => {
        console.log(data);
        setGroups(data);
      });
    }
    fetchData();
  }, []);

  const renderScreen = () => {
    if (route) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{"ji"}</Text>
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
