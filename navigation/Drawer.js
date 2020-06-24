import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import AppNavigation from "./AppNavigation";
import AboutUsNavigation from "./AboutUsNavigation";
import ContactUsNavigation from "./ContactUsNavigation";
import GalleryNavigation from "./GalleryNavigation";
import HoursNavigation from "./HoursNavigation";
import TeamNavigation from "./TeamNavigation";

import ProjectNavigation from "./ProjectNavigation";
import React, { Component } from "react";
import { SafeAreaView } from "react-navigation";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  AsyncStorage,
  Alert,
} from "react-native";
import { Button } from "react-native-elements";
import Gradient from "../components/Gradient";

const RootDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AppNavigation,
    },
    About: {
      screen: AboutUsNavigation,
    },
    Gallery: {
      screen: GalleryNavigation,
    },
    Project: {
      screen: ProjectNavigation,
    },

    Team: {
      screen: TeamNavigation,
    },
    Contact: {
      screen: ContactUsNavigation,
    },
    Hours: {
      screen: HoursNavigation,
    },
  },
  {
    contentComponent: (props) => (
      <Gradient.diagonalGradient>
        <SafeAreaView style={styles.container}>
          <View
            style={{
              height: "25%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../assets/NSSlogoPng.png")}
              style={{
                height: 150,
                width: 150,
                resizeMode: "stretch",
              }}
            ></Image>
          </View>
          <ScrollView>
            <DrawerItems
              {...props}
              activeLabelStyle={{ color: "white" }}
              inactiveLabelStyle={{ color: "white" }}
            />
            <View style={{ margin: 8, marginTop: "6%" }}>
              <TouchableOpacity
                style={{ justifyContent: "center" }}
                onPress={() =>
                  Alert.alert(
                    "Log out",
                    "Do you want to logout?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => {
                          return null;
                        },
                      },
                      {
                        text: "Confirm",
                        onPress: () => {
                          AsyncStorage.clear();
                          props.navigation.navigate("Auth");
                        },
                      },
                    ],
                    { cancelable: false }
                  )
                }
              >
                <Text
                  style={{
                    color: "white",
                    paddingLeft: "4%",
                    fontWeight: "bold",
                    color: "lightblue",
                  }}
                >
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Gradient.diagonalGradient>
    ),
  }
);

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
  },
});

export default RootDrawerNavigator;
