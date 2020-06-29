import React from "react";
import { Button } from "react-native-elements";
// import LinearGradient from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View, TouchableOpacity } from "react-native";
import Gradient from "./Gradient";

const FormButton = ({ title, buttonType, buttonColor, ...rest }) => (
  <TouchableOpacity
    {...rest}
    style={{
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <LinearGradient
      colors={Gradient.buttonGradient}
      style={{ borderRadius: 10, padding: 5, paddingHorizontal: 30 }}
    >
      <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
        {title}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
);

export default FormButton;

// const FormButton = ({ title, buttonType, buttonColor, ...rest }) => (
//   <Button
//     {...rest}
//     type={buttonType}
//     title={title}
//     // buttonStyle={{ borderColor: buttonColor, borderRadius: 20 }}
//     buttonStyle={{ backgroundColor: buttonColor, borderRadius: 0 }}
//     titleStyle={{ color: "white" }}
//   />
// );
