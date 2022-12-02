import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import Logo from "../Components/Logo";
// import {
//   GoogleSignin,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { set } from "../redux/userInfoSlice";

WebBrowser.maybeCompleteAuthSession();

// AuthSession.makeRedirectUri();

// React.useEffect(() => {
//   if (response?.type === "success") {
//     const { authentication } = response;
//   }
// }, [response]);

export default function Login() {
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();

  const dispatch = useDispatch();

  // GOOGLE AUTH
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "625284880671-3bi3p9otqsc7fcn7f12bpmpbpoqi3k1f.apps.googleusercontent.com",
    // iosClientId:
    //   "536279923900-23oa8bb9llrtm751fs9pkulbv1a8v4gp.apps.googleusercontent.com",
    // androidClientId:
    //   "536279923900-23oa8bb9llrtm751fs9pkulbv1a8v4gp.apps.googleusercontent.com",
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
    let userInfoRes = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // console.log(await userInfoRes.text());

    userInfoRes.json().then((data) => {
      setUserInfo(data);
      dispatch(set(data));
      //   goToHomeScreen();
    });
  }

  //NAVIGATION
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Logo />
      <Button
        title={accessToken ? "Get User Data" : "Sign in with Google"}
        onPress={
          accessToken
            ? getUserData
            : () => {
                promptAsync({ showInRecents: true });
              }
        }
      />
      <Text>Terms and conditions</Text>
      {/* <StatusBar style="auto" /> */}
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
