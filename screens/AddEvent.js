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
    date: "NA",
    deadline: "NA",
    params: null,
    deadlinePicker: false,
  };

  componentWillMount = () => {
    if (this.props.navigation.state.params != undefined) {
      var params = this.props.navigation.state.params;
      console.log(params);
      this.setState({ params, date: params.date, deadline: params.deadline });
    }
  };

  submitData = (values) => {
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
              deadline: this.state.deadline,
            };
            console.log("Final Upload Data", finalData);
            const db = firebase.firestore().collection("Events");
            if (this.state.params == null) {
              console.log("Adding");
              db.add(finalData).then((ref) => {
                ref.set({ id: ref.id }, { merge: true }).then(() => {
                  alert("Added Event");
                  this.props.navigation.goBack();
                });
              });
            } else {
              db.doc(this.state.params.id)
                .update(finalData)
                .then((res) => {
                  console.log("Response", res);
                  alert("Edited Event");
                  this.props.navigation.goBack();
                })
                .catch((err) => {
                  alert("Error editing event. Please Check your connection.");
                  this.props.navigation.goBack();
                  console.log(err);
                });
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  render() {
    return (
      <Gradient.diagonalGradient>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          style={{ flex: 1, marginBottom: 10 }}
        >
          <Formik
            initialValues={
              this.state.params == null
                ? {
                    title: "",
                    link: "",
                    imageUrl: "",
                    description: "",
                  }
                : this.state.params
            }
            onSubmit={(values, actions) => {
              this.submitData(values);
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
              <View style={{ marginVertical: 20 }}>
                <Text style={{ marginLeft: 25, color: "white" }}>Title</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  value={values.title}
                  multiline={true}
                  placeholder="Title"
                />
                <Text style={{ marginLeft: 25, color: "white" }}>
                  Event Date
                </Text>
                {this.pickDate(false)}
                <Text style={{ marginLeft: 25, color: "white" }}>
                  Apply Deadline
                </Text>
                {this.pickDate(true)}
                <Text style={{ marginLeft: 25, color: "white" }}>
                  Apply Link
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("link")}
                  onBlur={handleBlur("link")}
                  value={values.link}
                  multiline={true}
                  placeholder="Apply Link"
                />
                <Text style={{ marginLeft: 25, color: "white" }}>
                  Image Url
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("imageUrl")}
                  onBlur={handleBlur("imageUrl")}
                  value={values.imageUrl}
                  multiline={true}
                  placeholder="Image Url"
                />
                <Text style={{ marginLeft: 25, color: "white" }}>
                  Description
                </Text>
                <TextInput
                  style={{ ...styles.input, maxHeight: 400 }}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                  multiline={true}
                  numberOfLines={5}
                  placeholder="description"
                />

                <FormButton title="Submit" onPress={handleSubmit} />
              </View>
            )}
          </Formik>
        </ScrollView>
      </Gradient.diagonalGradient>
    );
  }

  pickDate = (deadline) => {
    return (
      <TouchableOpacity
        style={{ ...styles.input, padding: "0%" }}
        onPress={() => {
          this.setState({ deadlinePicker: deadline, datePicker: "date" });
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
            // placeholder={"Select Apply Date"}
            editable={false}
            value={deadline == true ? this.state.deadline : this.state.date}
            style={{ color: "white", width: width / 1.33 }}
          />
          <Fontisto name="date" size={width / 12} color="white" style={{}} />
        </View>
        {this.state.datePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={
              deadline
                ? this.state.deadline == "NA"
                  ? new Date()
                  : new Date(this.state.deadline)
                : this.state.date == "NA"
                ? new Date()
                : new Date(this.state.date)
            }
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={(event, selectDate) => {
              if (this.state.deadlinePicker == true) {
                console.log("dead");
                this.setState({
                  deadline:
                    selectDate == undefined
                      ? "NA"
                      : selectDate.toLocaleDateString(),
                  datePicker: null,
                });
                console.log(this.state);
              } else {
                console.log("dateee");
                this.setState({
                  date:
                    selectDate == undefined
                      ? "NA"
                      : selectDate.toLocaleDateString(),
                  datePicker: null,
                });
                console.log(this.state);
              }
            }}
          />
        )}
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
    marginTop: 4,
    marginBottom: 14,
    marginHorizontal: 20,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: "5%",
    color: "white",
  },
});

export default AddEventScreen;

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
