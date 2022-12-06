import { StyleSheet, Text, View, Button } from "react-native";
import Logo from "../Components/Logo";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { set } from "../redux/userInfoSlice";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();

  const dispatch = useDispatch();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "625284880671-3bi3p9otqsc7fcn7f12bpmpbpoqi3k1f.apps.googleusercontent.com",
    webClientId:
      "625284880671-uhalllfk13r1f6br6hdf0v2g7gnnchn4.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  React.useEffect(() => {
    if (response?.type == "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  async function getUserData() {

    //after user authorises access to their Google account,this grabs their profile information
    let userInfoRes = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    userInfoRes.json().then(async (data) => {
      setUserInfo(data);
      console.log(data);

      const userExists = await fetch(
        `https://groupie-backend.herokuapp.com/getUserByEmail/${data.email}`
      );

      //if the user's email is already registered, the user's profile is fetched from our database
      userExists.json().then(async (exists) => {
        const userData = {
          email: data.email,
          name: data.name,
          profileImage: data.picture,
          ownedGroups: [],
          memeberGroups: [],
          verified: data.verified_email,
        };
        console.log(userData);
        //if their email is not registered in our database, a new user profile will be added to our database using their Google profile information
        if (exists.code == 404) {
          console.log("New user - creating...");
          const addedUser = await fetch(
            "https://groupie-backend.herokuapp.com/addUser",
            {
              method: "POST",
              body: JSON.stringify(userData),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }
          );

          addedUser.json().then((data) => {
            console.log(data);
          });
        }

        //once a profile is identified or created, the user and their information are sent to the home screen
        dispatch(set(userData));
        goToHomeScreen();
      });
    });
  }

  //function that navigates the user to the home meny
  const goToHomeScreen = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Button
        //checks if the user has been authenticated, and either prompts them to the home screen or to provide authentication through Google
        title={accessToken ? "Logged In! Go to home" : "Sign in with Google"}
        onPress={
          accessToken
            ? getUserData
            : () => {
                promptAsync({ showInRecents: true });
              }
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    backgroundColor: "blue",
  },
});
