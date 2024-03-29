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
import { Picker } from "native-base";
import { Formik, Form, Field, FieldArray } from "formik";
// import firestore from '@react-native-firebase/firestore';
import firebase from "firebase";
import { boolean } from "yup";
import Gradient from "../../components/Gradient";
import FormButton from "../../components/FormButton";

class AddProjectScreen extends React.Component {
  state = {
    imageArray: [""],
    membersPicked: [""],
    teamMembers: [],
    category: "",
  };

  render() {
    return (
      <Gradient.diagonalGradient>
        <ScrollView keyboardShouldPersistTaps="handled">
          {this.renderForm()}
        </ScrollView>
      </Gradient.diagonalGradient>
    );
  }

  componentDidMount = () => {
    let query = firebase
      .firestore()
      .collection("TeamMember")
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        var teamMembers = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          teamMembers.push(data);
        });
        teamMembers.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        this.setState({ teamMembers });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  };

  renderTeamMemberPicker = () => {
    return (
      <View style={{}}>
        {this.state.membersPicked.map((item, index) => {
          return this.renderSinglePicker(index);
        })}
        <View style={{ ...styles.screen, flexDirection: "row", margin: 10 }}>
          <FormButton
            title={"Add Team\nMember"}
            onPress={() => {
              this.setState({
                membersPicked: [...this.state.membersPicked, ""],
              });
            }}
          />
          <View style={{ margin: "3%" }} />
          <FormButton
            title={"Delete Team\nMember"}
            onPress={() => {
              this.setState({
                membersPicked: this.state.membersPicked.slice(
                  0,
                  this.state.membersPicked.length - 1
                ),
              });
            }}
          />
        </View>
      </View>
    );
  };

  renderSinglePicker = (index) => {
    return (
      <View key={index + 9090} style={styles.picker}>
        <Picker
          style={{ color: "white" }}
          selectedValue={this.state.membersPicked[index]}
          placeholder="Select Member"
          onValueChange={(itemValue, itemPosition) => {
            if (itemPosition != 0) {
              var temp = this.state.membersPicked;
              temp[index] = itemValue;
              this.setState({
                membersPicked: temp,
              });
            }
          }}
        >
          <Picker.Item
            label="Select Member"
            value="Select Member"
            color="grey"
          />
          {this.state.teamMembers.map((member, index) => {
            return <Picker.Item key={index + 8890} label={member.name} value={member.name} />;
          })}
        </Picker>
      </View>
    );
  };

  renderInputImageArray = () => {
    return (
      <View>
        {this.state.imageArray.map((item, index) => {
          return (
            <TextInput
              key={index + 5050}
              style={styles.input}
              onChangeText={(text) => {
                var temp = this.state.imageArray;
                temp[index] = text;
                this.setState({ imageArray: temp });
              }}
              value={this.state.imageArray[index]}
              multiline={true}
              placeholder={"image Url" + (index + 1)}
            />
          );
        })}
        <View style={{ ...styles.screen, flexDirection: "row", margin: 10 }}>
          <FormButton
            title="Add Image"
            onPress={() => {
              this.setState({ imageArray: [...this.state.imageArray, ""] });
            }}
          />
          <View style={{ margin: "3%" }} />
          <FormButton
            title="Delete Image"
            onPress={() => {
              this.setState({
                imageArray: this.state.imageArray.slice(
                  0,
                  this.state.imageArray.length - 1
                ),
              });
            }}
          />
        </View>
      </View>
    );
  };

  renderForm = () => {
    return (
      <Formik
        initialValues={
          ({ title: "" }, { address: "" }, { iconUrl: "" }, { description: "" })
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
              {
                text: "Yes",
                onPress: () => {
                  const finalData = {
                    ...values,
                    imageArray: this.state.imageArray,
                    members: this.state.membersPicked,
                    category: this.state.category,
                  };
                  // console.log("Final Upload Data", finalData);
                  const db = firebase.firestore().collection("Projects");
                  db.add(finalData)
                    .then(() => {
                      alert("Event Added");
                      this.props.navigation.goBack();
                    })
                    .catch((err) => {
                      console.log("Error adding Event", err);
                      alert("Error Adding Event");
                    });
                },
              },
            ],
            { cancelable: false }
          );
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={{}}>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              value={values.title}
              multiline={true}
              placeholder="Title"
            />

            <View style={styles.picker}>
              <Picker
                style={{ color: "white" }}
                selectedValue={this.state.category}
                placeholder="Select Member"
                onValueChange={(itemValue, itemPosition) => {
                  this.setState({ category: itemValue });
                }}
              >
                <Picker.Item
                  label="Select Category"
                  value="Select Category"
                  color="grey"
                />
                <Picker.Item label={"Education"} value={"Education"} />
                <Picker.Item label={"Environment"} value={"Environment"} />
                <Picker.Item label={"Health"} value={"Health"} />
                <Picker.Item label={"Internships"} value={"Internships"} />
                <Picker.Item label={"Society"} value={"Society"} />
                <Picker.Item label={"Innovation"} value={"Innovation"} />
              </Picker>
            </View>

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
              style={{ ...styles.input, maxHeight: 400 }}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              multiline={true}
              numberOfLines={5}
              placeholder="description"
            />
            {this.renderTeamMemberPicker()}

            {this.renderInputImageArray()}

            <FormButton title="Submit" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
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

  picker: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: "2%",
  },
});

export default AddProjectScreen;
