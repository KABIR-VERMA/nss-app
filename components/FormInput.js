import React from "react";
import { Input, Text } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FormInput = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  ...rest
}) => (
  <View>
    <Text style={styles.text}>{name}</Text>
    <View style={styles.inputContainer}>
      <Input
        {...rest}
        // leftIcon={<Ionicons name={iconName} size={28} color={iconColor} />}
        // leftIconContainerStyle={styles.iconStyle}
        // placeholderTextColor="white"
        // name={name}
        // placeholder={placeholder}
        style={styles.input}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    // margin: 15,
    // borderWidth: 0,
    // borderColor: "white",
    borderRadius: 17,
    backgroundColor: "white",
  },
  iconStyle: {
    marginRight: 10,
  },
  text: {
    fontSize: 15,
    color: "white",
    padding: "1%",
    paddingLeft: '3%',
    paddingTop: 0,
  },
  input: {
    borderBottomWidth: 0,
  },
});

export default FormInput;
