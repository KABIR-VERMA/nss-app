import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Image,
  Alert,
} from "react-native";
import { Formik } from "formik";
// import firestore from '@react-native-firebase/firestore';
import firebase from "firebase";
import { Container } from "native-base";
import Gradient from "../components/Gradient";

class AddEventScreen extends Component {
  render() {
    return (
      <Gradient.diagonalGradient>
        <Text style={{ fontSize: 20, color: "white" }}>Add Event</Text>
      </Gradient.diagonalGradient>
    );
  }
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    maxHeight: 100,

    marginVertical: 5,
    marginHorizontal: 5,
    borderColor: "gray",
    borderWidth: 1,
  },
});

export default AddEventScreen;
