import React from "react";
import {
  View,
  Button,
  Stylesheet,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
  Text,
  FlatList,
  Switch,
  Image,
  BackHandler,
  StyleSheet,
} from "react-native";
import { withFirebaseHOC } from "../../config/Firebase";
import { Icon, withTheme } from "react-native-elements";
import {
  faSearch,
  faArrowLeft,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import FormButton from "../../components/FormButton";
// import { SafeAreaView } from "react-navigation";

const { width, height } = Dimensions.get("window");

const data = [
  {
    id: "h8249r9hr9uf",
    info:
      "Any complaints related to hours for Internship/External Social activities like participation in street play, blood donation etc., would be entertained within 3 months of completion of Internship. No arguments would be entertained in this regard. ",
  },
  {
    id: "fw94rjj3rj04",
    info:
      "No complaints would be entertained regarding the hours for projects after 1 month of corresponding Semester end. ",
  },
  {
    id: "f43jf03jek03",
    info:
      "Please complain only if you have a genuine complaint. Hours are provided based on the time, effort and dedication you put in.",
  },
  {
    id: "gd27r8fh2f2e",
    info:
      "The hours for small scale events such as talks on various issues, one time workshops would be uploaded within 72 hours of the event. Please complain only if you have not received the hours even after 3 days. ",
  },
  {
    id: "i8rhi8y9e97h",
    info:
      "Hours for large-scale one time events such as collections drive, cleanliness drive, blood donations camps etc. take more time. ",
  },
  {
    id: "e37e28rt713r",
    info:
      "Hours for volunteering opportunities will be updated only during mid sem and end sem. So, if you volunteer in a project, please wait until mid-sems/end sem for the hours to be uploaded. ",
  },
  {
    id: "qy4y329r732w",
    info:
      "Once you send a complaint, it takes time to process it and discuss with the person concerned. Please do not become impatient and start sending more complaints. Multiple complaints do not help you get it resolved. ",
  },
  {
    id: "i94u37yry94t",
    info:
      "If a complaint that you register is not resolved within 15 days, please drop a mail at nsshours©gmail.com. ",
  },
];

function Item(props) {
  return (
    <View style={styles.item}>
      <Text style={styles.info}>{props.item.info}</Text>
    </View>
  );
}

const list = data.map((item) => {
  return <Item item={item} key={item.id} />;
});

class CheckHours extends React.Component {
  constructor(props) {
    super(props);
    BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.handlePressBack();
      return true;
    });
    this.state = {};
  }

  render() {
    return (
      <View style={{ flexDirection: "column" }}>
        {/* {this.renderHeader()} */}
        <ScrollView style={styles.infoContainer}>{list}</ScrollView>

        <FormButton
          title="Hours Complaint"
          onPress={() =>
            Linking.openURL(
              "https://docs.google.com/forms/d/12OI4jYTlojRKglQuOcgqh90O01s9aa5IAbu00viYXAg/viewform"
            )
          }
        />
        <View style={{ marginBottom: 20 }} />
        <FormButton title="Back" onPress={this.props.handlePressBack} />
        <View style={{ marginBottom: 20 }} />
      </View>
    );
  }

  renderHeader = () => {
    return (
      <View style={styles.upperContainer}>
        <FontAwesomeIcon
          onPress={this.props.handlePressBack}
          style={{ ...styles.icon, left: -10, marginVertical: 12 }}
          size={width / 8}
          color="white"
          icon={faArrowLeft}
        />
        <FontAwesomeIcon
          style={styles.icon1}
          size={width / 8}
          icon={faExclamationTriangle}
          color="white"
        />
        <Text style={styles.text1}>HOURS COMPLAINT</Text>
        <FontAwesomeIcon
          style={styles.icon2}
          size={width / 8}
          icon={faExclamationTriangle}
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
    borderColor: "white",
    borderTopWidth: width / 500,
    borderBottomWidth: width / 500,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 5,
  },
  icon1: {
    top: height / 50,
  },
  icon2: {
    top: height / 50,
  },
  item: {
    borderColor: "white",
    borderTopWidth: width / 1000,
    padding: width / 100,
  },
  info: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
  },
  infoContainer: {
    textAlign: "left",
    color: "white",
    overflow: "visible",
    width: (100 / 105) * width,
    top: 0,
    marginLeft: (25 / 1050) * width,
    padding: width / 30,
  },
  button: {
    width: height * (15 / 195) * 5.23,
    height: height * (15 / 195),
    borderRadius: width / 20,
    borderWidth: 1,
    borderColor: "#6e63c4",
    marginLeft: 0,
  },
  text1: {
    top: height / 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    fontSize: height / 35,
    paddingBottom: height / 144,
  },
  text2: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
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
});

export default withFirebaseHOC(CheckHours);
