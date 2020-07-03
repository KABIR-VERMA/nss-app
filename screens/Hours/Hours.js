import React from "react";
import {
  View,
  Dimensions,
  Stylesheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Switch,
  StyleSheet,
} from "react-native";
import { withFirebaseHOC } from "../../config/Firebase";
// import { Icon } from "react-native-elements";
// import { Button, Container } from "native-base";
// import { LinearGradient } from "expo-linear-gradient";
// import Gradient from "../components/Gradient";
import HoursSelect from "./SelectHoursComplaint";
import Gradient from "../../components/Gradient";
// import CheckHours from "../components/CheckHours";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
  },
});

class Hours extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleCheckHours = () => {
    this.setState({ mode: "CheckHours" });
  };

  render() {
    return (
      <Gradient.diagonalGradient>
        <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>{<HoursSelect />}</ScrollView>
      </Gradient.diagonalGradient>
    );
  }
}

export default withFirebaseHOC(Hours);
