import React from "react";
import { Text, View, StyleSheet, Linking } from "react-native";
import { withFirebaseHOC } from "../config/Firebase";
import Gradient from "../components/Gradient";
import { Ionicons, Zocial } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

class Contact extends React.Component {
  render() {
    return (
      <Gradient.diagonalGradient>
        <View style={styles.container}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 38,
              fontFamily: "",
              marginTop: "20%",
            }}
          >
            We are Social :)
          </Text>
          {/* <Ionicons name="logo-facebook" size={90} color="" /> */}
          <TouchableOpacity
            style={{ paddingRight: "7%", marginTop: "6%" }}
            onPress={() => {
              Linking.openURL("fb://page/110459238983201");
            }}
          >
            <Zocial name="facebook" size={70} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: "6%" }}
            onPress={() => {
              Linking.openURL(
                "https://www.instagram.com/nssiitd/?fbclid=IwAR25THaqajYcUd9z0jTlgxrZMzBQrgkW3c5tRymzUFLX8kEIZOU5S9dnBW8"
              );
            }}
          >
            <Ionicons name="logo-instagram" size={80} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: "6%" }}
            onPress={() => {
              Linking.openURL(
                "https://www.youtube.com/user/NSSIITD?fbclid=IwAR1w8-VFXwXnKZX4l8wzAUjhk4lgakZLXXhMXkcSnOOm28v9nKanMD18xec"
              );
            }}
          >
            <Ionicons name="logo-youtube" size={70} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: "6%", padding: "3%" }}
            onPress={() => {
              Linking.openURL(`mailto:nssgsec@admin.iitd.ac.in`);
            }}
          >
            <Text style={{ fontSize: 23, color: "white", textAlign:'center' }}>
              Email: nssgsec@admin.iitd.ac.in
            </Text>
          </TouchableOpacity>
        </View>
      </Gradient.diagonalGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default withFirebaseHOC(Contact);
