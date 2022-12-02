import { Image, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <Image
      source={require("../assets/Groupie-logos_transparent.png")}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    marginBottom: 8,
  },
});
