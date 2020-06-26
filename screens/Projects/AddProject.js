import React from "react";
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
import { boolean } from "yup";
import Gradient from "../../components/Gradient";
import FormButton from "../../components/FormButton";

const AddProjectScreen = (props) => {
  const db = firebase.firestore().collection("Projects");
  return (
    <Gradient.diagonalGradient>
      <ScrollView>
        <Formik
          initialValues={
            ({ title: "" },
            { category: "" },
            { address: "" },
            { iconUrl: "" },
            { imageUrl: "" },
            { description: "" })
          }
          onSubmit={(values) => {
            Alert.alert(
              "Check before adding",
              "Are you sure you want to add to database?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                { text: "Yes", onPress: () => db.add(values) },
              ],
              { cancelable: false }
            );
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
                multiline={true}
                placeholder="Title"
              />
              <TextInput
                style={styles.input}
                onChangeText={handleChange("category")}
                onBlur={handleBlur("category")}
                value={values.category}
                multiline={true}
                placeholder="Category"
              />
              <TextInput
                style={styles.input}
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                value={values.address}
                multiline={true}
                placeholder="Address"
              />
              <TextInput
                style={styles.input}
                onChangeText={handleChange("iconUrl")}
                onBlur={handleBlur("iconUrl")}
                value={values.iconUrl}
                multiline={true}
                placeholder="iconUrl"
              />
              <TextInput
                style={styles.input}
                onChangeText={handleChange("imageUrl")}
                onBlur={handleBlur("imageUrl")}
                value={values.imageUrl}
                multiline={true}
                placeholder="imageUrl"
              />
              <TextInput
                style={styles.input}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                multiline={true}
                placeholder="description"
              />

              <FormButton title="Submit" onPress={handleSubmit}/>
            </View>
          )}
        </Formik>
      </ScrollView>
    </Gradient.diagonalGradient>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    // maxHeight: 100,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    padding: "5%",
    color: "white",
  },
});

export default AddProjectScreen;
