import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/Home";
import AddEventScreen from "../screens/AddEvent";
import Header from "../shared/Header";

import React from "react";

const bgcolor = "#426885";

const AppNavigation = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => {
        return {
          headerStyle: { backgroundColor: bgcolor },
          headerTitle: () => (
            <Header navigation={navigation} title={"NSS IIT-D"} drawer={true} />
          ),
        };
      },
    },
    AddEventScreen: {
      screen: AddEventScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerStyle: { backgroundColor: bgcolor },
          // headerTitleStyle: { textDecorationColor: 'white' },
          // headerTintColor: "white",
          headerTitle: () => (
            <Header
              navigation={navigation}
              title={"NSS IIT-D"}
              drawer={false}
            />
          ),
        };
      },
    },
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerLeftContainerStyle: {
        backgroundColor: "#404c59",
      },
      headerTintColor: "white",
    },
  }
);

export default AppNavigation;
