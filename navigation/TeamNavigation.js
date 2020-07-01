import { createStackNavigator } from "react-navigation-stack";
import Team from "../screens/Team";
import AddTeam from "../screens/AddTeam";
import EditTeam from "../screens/EditTeam";
import Header from "../shared/Header";
import React from "react";

const TeamNavigation = createStackNavigator(
  {
    Team: {
      screen: Team,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: () => (
            <Header navigation={navigation} title={"Team NSS"} drawer={true} />
          ),
        };
      },
    },
    AddTeam: {
      screen: AddTeam,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: (
            <Header
              navigation={navigation}
              title={"Add Team Member"}
              drawer={false}
            />
          ),
        };
      },
    },
    EditTeam: {
      screen: EditTeam,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: (
            <Header
              navigation={navigation}
              title={"Edit Team Member"}
              drawer={false}
            />
          ),
        };
        F;
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerLeftContainerStyle: {
        backgroundColor: "#404c59",
      },
      headerTintColor: "white",
    },
  }
);
export default TeamNavigation;
