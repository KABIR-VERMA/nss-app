import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Gradient from "../components/Gradient";

export default function Header({ navigation, title, drawer }) {
  var isdrawer = drawer;
  return (
    <LinearGradient colors={Gradient.headerGradient} style={{ flex: 1 }}>
      <View style={styles.header}>
        {isdrawer && (
          <MaterialIcons
            name="menu"
            color="white"
            size={28}
            onPress={navigation.openDrawer}
            style={styles.icon}
          />
        )}
        <View>
          <Text style={[styles.headerText, { right: isdrawer ? 0 : 28 }]}>
            {title}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    letterSpacing: 1,
  },
  icon: {
    position: "absolute",
    left: 16,
  },
});
