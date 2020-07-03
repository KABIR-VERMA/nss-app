import { createStackNavigator } from "react-navigation-stack";
import About from "../screens/AboutUs";
import Header from "../shared/Header";
import React from "react";

const AboutUsNavigation = createStackNavigator(
  {
    About: {
      screen: About,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: () => (
            <Header navigation={navigation} title={"About NSS"} drawer={true} />
          ),
        };
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "white",
    },
  }
);
export default AboutUsNavigation;
