import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Image,
  Alert,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Formik } from "formik";
// import firestore from '@react-native-firebase/firestore';
import DateTimePicker from "@react-native-community/datetimepicker";
import firebase from "firebase";
import { Container } from "native-base";
import Gradient from "../components/Gradient";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import { Fontisto, Ionicons } from "@expo/vector-icons";

var width = Dimensions.get("screen").width;

class AddEventScreen extends Component {
  state = {
    datePicker: null,
    date: "",
  };

  render() {
    return (
      <Gradient.diagonalGradient>
        <ScrollView>
          <Formik
            initialValues={{
              title: "",
              link: "",
              imageUrl: "",
              description: "",
            }}
            onSubmit={(values, actions) => {
              // console.log(values);
              // console.log(values, values.description)
              Alert.alert(
                "Check before adding",
                "Are you sure you want to add to database?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      const finalData = {
                        ...values,
                        date: this.state.date,
                      };
                      console.log("Final Upload Data", finalData);
                      const db = firebase.firestore().collection("Events");
                      db.add(finalData);
                      this.props.navigation.goBack()
                    },
                  },
                ],
                { cancelable: false }
              );
            }}
          >
            {({
              handleChange,
              values,
              handleSubmit,
              errors,
              isValid,
              touched,
              handleBlur,
              isSubmitting,
              setFieldValue,
            }) => (
              <View style={{}}>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  value={values.title}
                  multiline={true}
                  placeholder="Title"
                />

                {this.pickDate()}

                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("link")}
                  onBlur={handleBlur("link")}
                  value={values.link}
                  multiline={true}
                  placeholder="Apply Link"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("imageUrl")}
                  onBlur={handleBlur("imageUrl")}
                  value={values.imageUrl}
                  multiline={true}
                  placeholder="Image Url"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                  multiline={true}
                  placeholder="description"
                />

                <FormButton title="Submit" onPress={handleSubmit} />
              </View>
            )}
          </Formik>
        </ScrollView>
        {this.state.datePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={(event, selectDate) => {
              console.log(
                "event",
                event,
                "selectDate",
                selectDate.toLocaleDateString()
              );
              this.setState({
                date: selectDate.toLocaleDateString(),
                datePicker: null,
              });
            }}
          />
        )}
      </Gradient.diagonalGradient>
    );
  }

  pickDate = () => {
    return (
      <TouchableOpacity
        style={{
          marginVertical: 10,
          borderRadius: 10,
          borderColor: "white",
          borderWidth: 1,
          marginHorizontal: 20,
        }}
        onPress={() => {
          this.setState({ datePicker: "date" });
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            marginLeft: 10,
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder={"Select Apply Date"}
            editable={false}
            value={this.state.date}
            style={{ color: "white", width: width / 1.33 }}
          />
          <Fontisto name="date" size={width / 12} color="white" style={{}} />
        </View>
      </TouchableOpacity>
    );
  };
}

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
    borderRadius: 10,
    padding: "5%",
    color: "white",
  },
});

export default AddEventScreen;

// pickDate = () => {
//   return (
//     <View style={{ flexDirection: "row", width: "100%" }}>
//       <TextInput
//         placeholder={"Select Apply Date"}
//         editable={false}
//         value={this.state.applyDate}
//         style={{ width: "70%" }}
//       />
//       <Fontisto
//         onPress={() => {
//           this.setState({ mode: "date" });
//         }}
//         name="date"
//         size={30}
//         color="white"
//       />

//       {this.state.mode && (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={new Date()}
//           mode={"date"}
//           is24Hour={true}
//           display="default"
//           onChange={(event, selectDate) => {
//             console.log(
//               "event",
//               event,
//               "selectDate",
//               selectDate.toLocaleDateString()
//             );
//             this.setState({
//               applyDate: selectDate.toLocaleDateString(),
//               mode: null,
//             });
//           }}
//         />
//       )}
//     </View>
//   );
// };

// pickTime = () => {
//   return (
//     <View style={{ flexDirection: "row", width: "100%" }}>
//       <TextInput
//         placeholder={"Select Apply Deadline"}
//         editable={false}
//         value={this.state.applyDate}
//         style={{ width: "70%" }}
//       />

//       <Ionicons
//         onPress={() => {
//           this.setState({ mode: "time" });
//         }}
//         name="md-time"
//         size={30}
//         color="white"
//       />

//       {this.state.mode && (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={new Date()}
//           mode={"date"}
//           is24Hour={true}
//           display="default"
//           onChange={(event, selectDate) => {
//             console.log(
//               "event",
//               event,
//               "selectDate",
//               selectDate.toLocaleDateString()
//             );
//             this.setState({
//               applyDate: selectDate.toLocaleDateString(),
//               mode: null,
//             });
//           }}
//         />
//       )}
//     </View>
//   );
// };
