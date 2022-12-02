import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
export default function Profile(props) {
  // Access the store via the `useContext` hook
  const userInfo = useSelector((state) => state.userInfo.value);
  const [userData, setUserData] = React.useState();

  useEffect(() => {
    console.log(userInfo.payload);
  }, []);

  const renderProfileForm = () => {
    let userData = userInfo.payload;
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/user-profile.png")}
        />
        <Text style={styles.nameText}>Hello, {userData.given_name}</Text>
        <Text style={styles.otherText}>
          Verified Account: {userData.verified_email ? "Yes" : "No"}
        </Text>
      </View>
    );
  };

  const renderScreen = () => {
    return renderProfileForm();
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
  image: {
    width: 250,
    height: 250,
    marginBottom: 50,
  },
  nameText: {
    fontFamily: "Courier New",
    fontSize: "30em",
    fontWeight: "bold",
  },
  otherText: {
    fontFamily: "Courier New",
    fontSize: "20em",
  },
});
