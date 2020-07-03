import React from "react";
import {
  View,
  Stylesheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Switch,
  Image,
  StyleSheet,
} from "react-native";
import { withFirebaseHOC } from "../../config/Firebase";
// import { Icon } from "react-native-elements";
import { Button } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSearch,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const { width, height } = Dimensions.get("window");

function handlePress(msg) {
  alert(msg);
}

function HoursButton(props) {
  const icon_left = props.txt === "CHECK\nHOURS" ? width / 12 : width / 6.25;
  const styles = StyleSheet.create({
    button: {
      flex: 1,
      borderWidth: 1,
      borderColor: "white",
      borderWidth: width / 100,
      width: props.width,
      height: props.height,
      marginTop: props.pTop,
      marginBottom: props.pBottom,
      borderRadius: props.bRadius,
      backgroundColor: "#38434f",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      textAlign: "center",
      alignContent: "center",
      overflow: "visible",
      paddingLeft: 0,
    },
    text: {
      fontWeight: "bold",
      bottom: 0,
      top: width / 12,
      left: -width / 12,
      fontSize: 20,
      color: "white",
      fontStyle: "normal",
      textAlign: "center",
      textAlignVertical: "bottom",
    },
    icon: {
      marginLeft: 0,
      bottom: width / 10,
      position: "relative",
      left: icon_left,
    },
  });
  return (
    <Button onPress={props.handlePress} style={styles.button}>
      <FontAwesomeIcon
        style={styles.icon}
        size={width / 6}
        icon={props.txt === "CHECK\nHOURS" ? faSearch : faExclamationTriangle}
        color="white"
      />
      <Text style={styles.text}>{props.txt}</Text>
    </Button>
  );
}

export default withFirebaseHOC(HoursButton);

// const icon_left = props.txt === "CHECK\nHOURS" ? width / 12 : width / 6;
// const styles = StyleSheet.create({
//   button: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "white",
//     borderWidth: width / 100,
//     width: props.width,
//     height: props.height,
//     marginTop: props.pTop,
//     marginBottom: props.pBottom,
//     borderRadius: props.bRadius,
//     backgroundColor: "#38434f",
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "center",
//     textAlign: "center",
//     alignContent: "center",
//     overflow: "visible",
//     paddingLeft: 0,
//   },
//   text: {
//     fontWeight: "bold",
//     bottom: 0,
//     top: width / 12,
//     left: -width / 11,
//     fontSize: props.width / 8,
//     color: "white",
//     fontStyle: "normal",
//     textAlign: "center",
//     textAlignVertical: "bottom",
//   },
//   icon: {
//     marginLeft: 10,
//     bottom: width / 10,
//     position: "relative",
//     left: icon_left,
//   },
// });
