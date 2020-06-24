import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ErrorMessage = ({ errorValue }) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>{errorValue}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginLeft: 25
  },
  errorText: {
    color: "yellow",
    padding: '1%',
    paddingBottom: '0.5%'
  }
});

export default ErrorMessage;
