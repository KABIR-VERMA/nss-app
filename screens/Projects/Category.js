import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextComponent,
  Button,
  Dimensions,
  Image,
} from "react-native";

import PROJECTCATEGORIES from "../../data/dummy-data";
import { log } from "react-native-reanimated";
import ProjectCategoryGridTile from "../../components/ProjectGridTile";
import { ScrollView } from "react-native-gesture-handler";
import Gradient from "../../components/Gradient";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "native-base";
import FormButton from "../../components/FormButton";
// import CategoryGridTile from "../../components/ProjectGridTile";

var height = Dimensions.get("window").height;
var width = Dimensions.get("window").width;

// const CategoryScreen = (props) => {
class CategoryScreen extends Component {
  // console.log(typeof PROJECTCATEGORIES);
  // ----------category is list of categories--------------

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
            {/* {The iconUrl should be a png with black oultine..........
                White tint color is applied here
            } */}
            {item.iconUrl}
            <Text style={styles.text}>{item.title}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  // renderCategoryIcon = (url) => {
  //   const t = url
  //   console.log(t)
  //   return (
  //     <Image
  //       source={require(t)}
  //       style={styles.buttonIcon}
  //     />
  //   );
  // };

  render() {
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
          {/* <FlatList
            keyExtractor={(item) => item.id}
            data={PROJECTCATEGORIES}
            // renderItem={(itemData) => {
            //   return (
            //     <ProjectCategoryGridTile
            //       title={itemData.item.title}
            //       color={itemData.item.color}
            //       onSelect={() => {
            //         console.log("we r in navigation");
            //         try {
            //           this.props.navigation.navigate("ProjectList", {
            //             title: itemData.item.title,
            //           });
            //         } catch (error) {
            //           console.log("error", error);
            //         }
            //       }}
            //     />
            //     // <View style={styles.screen}><Text>{itemData.item.title}</Text></View>
            //   );
            // }}
            numColumns={2}
          /> */}
          {/* <Button
            title="BAck to home screen"
            onPress={() => {
              this.props.navigation.navigate("Home");
            }}
            titleStyle={{
              color: "#F57C00",
            }}
            type="clear"
          /> */}

          {this.addProjectButton()}
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
