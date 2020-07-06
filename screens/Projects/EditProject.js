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

class EditProjectScreen extends React.Component {
  constructor(props) {
    super();
    this.category = props.navigation.getParam("category");
    this.title = props.navigation.getParam("title");
    this.address = props.navigation.getParam("address");
    this.iconUrl = props.navigation.getParam("iconUrl");
    this.description = props.navigation.getParam("description");
    this.members = props.navigation.getParam("members");
    this.imageArray = props.navigation.getParam("imageArray");
    this.state = {
      imageArray: [],
      membersPicked: this.members != undefined ? this.members : [],
      designationArr: [],
      category: this.category,
      title: this.title,
      iconUrl: this.iconUrl,
      description: "",
    };
  }

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
        var designationArr = [];
        const Coordinator = [];
        const FacultyAdvisor = [];
        const TeamMentor = [];
        const GeneralSecretary = [];
        const Secretary = [];
        const Executive = [];
        const PGRep = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          switch (data.designation) {
            case "PG Rep":
              PGRep.push(data);
              break;
            case "Executive":
              Executive.push(data);
              break;
            case "Secretary":
              Secretary.push(data);
              break;
            case "General Secretary":
              GeneralSecretary.push(data);
              break;
            case "Team Mentor":
              TeamMentor.push(data);
              break;
            case "Faculty Advisor (Education)":
              FacultyAdvisor.push(data);
              break;
            case "Faculty Advisor (Environment)":
              FacultyAdvisor.push(data);
              break;
            case "Faculty Advisor (Health)":
              FacultyAdvisor.push(data);
              break;
            case "Faculty Advisor (Society)":
              FacultyAdvisor.push(data);
              break;
            case "Co-ordinator NSS IIT Delhi":
              Coordinator.push(data);
              break;
            default:
          }
        });
        designationArr = [
          Coordinator,
          GeneralSecretary,
          Secretary,
          Executive,
          TeamMentor,
          PGRep,
        ];
        this.setState({ designationArr });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });

    if (true) {
      console.log("hello");
      var params = this.props.navigation.state.params;
      console.log("ppppppaaaarrraaammssss", params);
      this.setState({
        params,
        title: params.title,
        iconUrl: params.iconUrl,
        description: params.description,
        address: params.address,
        membersPicked: params.members,
        imageArray: params.imageArray,
      });
      this.forceUpdate();
    }
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
              var address = this.props.navigation.getParam("address");
              console.log("address", address);
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
          {this.state.designationArr.map((designation) => {
            return designation.map((member) => {
              return <Picker.Item label={member.name} value={member.name} />;
            });
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
        enableReinitialize
        initialValues={this.state}
        onSubmit={(values) => {
          // console.log('values-----------------------------',values)
          // console.log(this.title,this.iconUrl,this.address)
          console.log("-----------------------------");
          console.log(this.state);
          console.log("-------------values-------------------");
          console.log(values);
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
                    title: values.title,
                    imageArray: this.state.imageArray,
                    members: this.state.membersPicked,
                    category: this.state.category,
                    description: values.description,
                    iconUrl: values.iconUrl,
                    address: values.address,
                  };
                  // console.log('Final Upload Data', finalData);
                  var db = firebase.firestore();
                  firebase
                    .firestore()
                    .collection("Projects")
                    .where("title", "==", this.state.title)
                    .get()
                    .then((querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                        console.log(doc.id, " => ", doc.data());
                        // Build doc ref from doc.id
                        db.collection("Projects").doc(doc.id).update(finalData);
                        alert("Edited Project");
                        this.props.navigation.goBack();
                      });
                    })

                    .catch((error) => {
                      console.log(error);
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

export default EditProjectScreen;
