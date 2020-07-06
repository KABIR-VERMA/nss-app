import React from "react";
import {
  View,
  Button,
  Stylesheet,
  TextInput,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Text,
  Switch,
  Image,
  StyleSheet,
  BackHandler,
} from "react-native";
import { withFirebaseHOC } from "../../config/Firebase";
import { faSearch, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import FormButton from "../../components/FormButton";

// import { Thumbnail } from "native-base";

const { width, height } = Dimensions.get("window");

class CheckHours extends React.Component {
  constructor(props) {
    super(props);
    BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.handlePressBack();
      return true;
    });
    this.state = {
      mode: "enter",
      buttonPress: false,
      EntryNumber: "",
      buttonDisable: true,
      resultFetched: false,
      name: "",
      hrs_completed: "",
      hrs_total: "",
      hrs_left: "",
      success: "",
      error: "",
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  handleChangeText(EntryNumber) {
    const len = EntryNumber.length;
    if (len < 11) this.setState({ EntryNumber, buttonDisable: true });
    else if (len == 11) this.setState({ EntryNumber, buttonDisable: false });
  }

  view() {
    if (this.state.success === 0) {
      return (
        <View>
          <Text
            style={{
              color: "yellow",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: width / 19,
              paddingVertical: height / 10,
            }}
          >
            Error : {this.state.error}
          </Text>

          <FormButton title="OK" onPress={() => this.handleButton("OK")} />
        </View>
      );
    } else if (this.state.success === 1) {
      return (
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              color: "white",
              paddingVertical: height / 36,
            }}
          >
            {this.state.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "rgba(0,0,0,0.1)",
              justifyContent: "center",
              paddingVertical: "5%",
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                }}
              >
                Hours Completed{" "}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                }}
              >
                Hours Left
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                }}
              >
                Hours Total{" "}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                fontSize: 20,
                // paddingHorizontal: width / 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                }}
              >
                {": " + this.state.hrs_completed}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                }}
              >
                {": " + this.state.hrs_left}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                }}
              >
                {": " + this.state.hrs_total}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: "10%" }}>
            <FormButton title="OK" onPress={() => this.handleButton("OK")} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator size="large" animating={true} />
        </View>
      );
    }
  }

  handleButton(name) {
    if (name === "check") {
      this.setState({ mode: "ok" });
      fetch(
        "https://nss-hours.herokuapp.com/hours?entry=" + this.state.EntryNumber
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) this.setState({ resultFetched: true, ...data });
          else {
            console.log("Error");
            this.setState({
              resultFetched: true,
              error: "Invalid Entry Number",
              success: 0,
            });
          }
        })
        .catch(() => {
          console.log("Error");
          this.setState({
            resultFetched: true,
            error: "Invalid Entry Number or Network Error",
            success: 0,
          });
        });
    } else {
      const newdata = {
        buttonDisable: true,
        EntryNumber: "",
        name: "",
        hrs_completed: "",
        hrs_total: "",
        hrs_left: "",
        success: "",
        error: "",
      };
      this.setState({ mode: "enter", resultFetched: false, ...newdata });
    }
  }

  render() {
    const search = (
      <View>
        <Text style={styles.text2}>ENTRY NUMBER</Text>
        <TextInput
          onChangeText={this.handleChangeText}
          value={this.state.EntryNumber}
          style={styles.textbox}
        />
        {/* <TouchableOpacity
          disabled={this.state.buttonDisable}
          style={{ ...styles.button, top: height / 12, left: width / 5.5 }}
          onPress={() => this.handleButton("check")}
        >
          <Image
            name="check"
            style={styles.button}
            source={require("../../assets/CheckButton1.jpg")}
          />
        </TouchableOpacity> */}
        <View style={{ marginTop: "20%" }}>
          <FormButton
            title="Check"
            onPress={() => this.handleButton("check")}
          />
        </View>
      </View>
    );

    return (
      <View style={{ flexDirection: "column", height: height * 1 }}>
        {/* {this.renderHeader()} */}
        <View style={styles.formContainer}>
          <Text style={styles.text1}>CHECK NSS HOURS</Text>
          {this.state.mode === "enter" ? search : this.view()}
        </View>
        <View style={{ marginTop: height / 5 }}>
          <FormButton title="Back" onPress={this.props.handlePressBack} />
        </View>
      </View>
    );
  }

  renderHeader = () => {
    return (
      <View style={{ ...styles.upperContainer, flexDirection: "row" }}>
        <FontAwesomeIcon
          onPress={this.props.handlePressBack}
          style={{
            ...styles.icon,
            right: width / 4.4,
            marginVertical: height / 36,
          }}
          size={width / 8}
          color="white"
          icon={faArrowLeft}
        />
        <FontAwesomeIcon
          style={{
            ...styles.icon,
            paddingLeft: width / 3,
            right: width / 11,
            marginVertical: height / 72,
          }}
          size={width / 6}
          icon={faSearch}
          color="white"
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  upperContainer: {
    backgroundColor: "#38434f",
    minWidth: width,
    height: height / 8,
    justifyContent: "center",
    alignItems: "flex-start",
    borderColor: "white",
    borderTopWidth: width / 500,
    borderBottomWidth: width / 500,
  },
  icon: {
    alignItems: "center",
  },
  formContainer: {
    borderColor: "white",
    borderWidth: 1.5,
    borderRadius: 10,
    height: (925 / 1950) * height,
    width: (80 / 105) * width,
    top: height * (275 / 1970),
    marginLeft: (125 / 1050) * width,
  },
  item: {
    textAlign: "center",
  },
  button: {
    width: (375 / 1050) * width,
    height: height * (10 / 195),
    borderRadius: width / 30,
    borderWidth: 0.5,
    borderColor: "#6e63c4",
    marginLeft: 0,
  },
  text1: {
    paddingTop: height / 36,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    // fontSize: height / 35,
    fontSize: 23,
    borderBottomWidth: 0.5,
    borderColor: "white",
    paddingBottom: height / 144,
    borderBottomLeftRadius: 10000000,
    borderBottomRightRadius: 10000000,
  },
  text2: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
    paddingTop: height / 12,
    paddingBottom: height / 60,
  },
  textbox: {
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 5,
    width: (4.5 / 7) * width,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: height / 30,
    height: height * (1 / 20),
  },
  activityIndicatorWrapper: {
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: height / 5.3,
    marginLeft: width / 4.3,
  },
});

export default withFirebaseHOC(CheckHours);
