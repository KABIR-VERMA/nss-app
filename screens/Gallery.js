import React from "react";

import { withFirebaseHOC } from "../config/Firebase";
import Gradient from "../components/Gradient";
import { Text, View, StyleSheet } from "react-native";

function Gallery() {
  console.log("hello world");
  return (
    <Gradient.diagonalGradient>
      <View style={styles.container}>
        <Text style={{ color: "white" }}>Gallery</Text>
      </View>
    </Gradient.diagonalGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default withFirebaseHOC(Gallery);
