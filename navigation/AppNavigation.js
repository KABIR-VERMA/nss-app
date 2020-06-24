import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/Home";
import Header from "../shared/Header";
import React from "react";

const bgcolor = "#426885";

const AppNavigation = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerStyle: { backgroundColor: bgcolor },
        // headerTitleStyle: { textDecorationColor: 'white' },
        // headerTintColor: "white",
        headerTitle: () => (
          <Header navigation={navigation} title={"NSS IIT-D"} drawer={true} />
        ),
      };
    },
  },
});

export default AppNavigation;
