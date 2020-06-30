import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";

import PROJECTCATEGORIES from "../../data/dummy-data";
import Gradient from "../../components/Gradient";
import { LinearGradient } from "expo-linear-gradient";
import FormButton from "../../components/FormButton";
import Fire from "../../config/Firebase/firebase";
// import CategoryGridTile from "../../components/ProjectGridTile";

var height = Dimensions.get("window").height;
var width = Dimensions.get("window").width;

class CategoryScreen extends Component {
  roundButton = (item) => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            try {
              this.props.navigation.navigate("ProjectList", {
                title: item.title,
              });
            } catch (error) {
              console.log("error", error);
            }
          }}
        >
          <LinearGradient
            colors={Gradient.headerGradient}
            style={styles.button}
          >
            {item.iconUrl}
            <Text style={styles.text}>{item.title}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    console.log("global", global.isAdmin);
    return (
      <Gradient.diagonalGradient>
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {PROJECTCATEGORIES.map((item, ind) => {
            if (ind % 2 == 1) return null;
            return (
              <View
                key={ind}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                {this.roundButton(PROJECTCATEGORIES[ind])}
                {ind == PROJECTCATEGORIES.length - 1
                  ? null
                  : this.roundButton(PROJECTCATEGORIES[ind + 1])}
              </View>
            );
          })}

          {global.isAdmin ? this.addProjectButton() : null}
        </SafeAreaView>
      </Gradient.diagonalGradient>
    );
  }

  addProjectButton = () => {
    return (
      <FormButton
        title="Add Project"
        onPress={() => {
          try {
            this.props.navigation.navigate("AddProject");
          } catch (error) {
            console.log(error);
          }
        }}
      />
    );
  };
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: width / 2,
    padding: "6%",
    paddingVertical: "4%",
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
    fontSize: 20,
  },
  buttonIcon: {
    height: "30%",
    aspectRatio: 1,
    tintColor: "white",
  },
});

export default CategoryScreen;
