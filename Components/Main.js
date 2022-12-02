import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Profile from "../Pages/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import store from "../redux/store";
import { Provider } from "react-redux";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Main() {
  const userInfo = useSelector((state) => state.userInfo.value);
  return userInfo ? (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={"Home"}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;

              if (rn === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (rn === "Profile") {
                iconName = focused ? "person" : "person-outline";
              }
              // else if (rn === settingsName) {
              //   iconName = focused ? "settings" : "settings-outline";
              // }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "grey",
            tabBarLabelStyle: {
              paddingBottom: 10,
              fontSize: 10,
            },
            tabBarStyle: [
              {
                display: "flex",
              },
              null,
            ],
          })}
        >
          <Tab.Screen name={"Home"} component={Home} />
          <Tab.Screen name={"Profile"} component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  ) : (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "green",
            },
            headerTintColor: "#fff",
          }}
        >
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center",
  },
});
