import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-navigation";
import { render } from "react-dom";

const diagonalBG = ({ children }) => {
  return (
    <LinearGradient
      colors={["#456c8b", "#40637f", "#334f65", "#253a4b"]}
      start={[0.0, 0.0]}
      end={[1.0, 1.0]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </LinearGradient>
  );
};

export default gradients = {
  buttonGradient: ["#7255b1", "#6c67c9", "#6b6cd1", "#6971d8"],
  bgGradient: ["#456c8b", "#40637f", "#334f65", "#253a4b"],
  diagonalGradient: diagonalBG,
};