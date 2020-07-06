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
import { LinearGradient } from "expo-linear-gradient";
import { withFirebaseHOC } from "../../config/Firebase";
// import { Icon } from "react-native-elements";
import { Button } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSearch,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import Gradient from '../../components/Gradient'

const { width, height } = Dimensions.get("window");

function handlePress(msg) {
  alert(msg);
}

function HoursButton(props) {
  const icon_left = props.txt === "CHECK\nHOURS" ? width / 12 : width / 6.25;
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonContainer: {
      width: width / 1.9,
      padding: "6%",
      paddingTop: "30%",
      paddingBottom:'0%',
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      width: "100%",
      aspectRatio: 1,
      backgroundColor: "red",
      borderRadius: (width * 0.8) / 4,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "white",
      borderWidth: 1,
    },
    text: {
      color: "white",
      fontSize: 16,
      textAlign:"center"
    },
    buttonIcon: {
      height: "30%",
      aspectRatio: 1,
      tintColor: "white",
    },


    // button: {
    //   flex: 1,
    //   borderWidth: 1,
    //   borderColor: "white",
    //   borderWidth: width / 100,
    //   width: props.width,
    //   height: props.height,
    //   marginTop: props.pTop,
    //   marginBottom: props.pBottom,
    //   borderRadius: props.bRadius,
    //   backgroundColor: "#38434f",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   alignSelf: "center",
    //   textAlign: "center",
    //   alignContent: "center",
    //   overflow: "visible",
    //   paddingLeft: 0,
    // },
    // text: {
    //   fontWeight: "bold",
    //   bottom: 0,
    //   top: width / 12,
    //   left: -width / 12,
    //   fontSize: 20,
    //   color: "white",
    //   fontStyle: "normal",
    //   textAlign: "center",
    //   textAlignVertical: "bottom",
    // },
    // icon: {
    //   marginLeft: 0,
    //   bottom: width / 10,
    //   position: "relative",
    //   left: icon_left,
    // },
  });
  return (
    <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={props.handlePress}
        >
          <LinearGradient
            colors={Gradient.headerGradient}
            style={styles.button}
          >
            <FontAwesomeIcon
            style={styles.buttonIcon}
            size={width / 6}
            icon={props.txt === "CHECK\nHOURS" ? faSearch : faExclamationTriangle}
            color="white"
            />
            <Text style={styles.text}>{props.txt}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

export default withFirebaseHOC(HoursButton);
