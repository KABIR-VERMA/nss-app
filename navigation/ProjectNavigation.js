import createAppContainer from "react-navigation";
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";
import { View, Text } from "react-native";
import CategoryScreen from "../screens/Projects/Category";
import ProjectDetailScreen from "../screens/Projects/ProjectDetail";
import ProjectListScreen from "../screens/Projects/ProjectList";
import AddProjectScreen from "../screens/Projects/AddProject";
import { Ionicons } from "@expo/vector-icons";
import Header, { StackHeader } from "../shared/Header";
import React from "react";

const ProjectNavigation = createStackNavigator(
  {
    Categories: {
      screen: CategoryScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTintColor: "white",
          headerTitle: () => (
            <Header navigation={navigation} title={"Projects"} drawer={true} />
          ),
        };
      },
    },
    ProjectList: {
      screen: ProjectListScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTintColor: "white",
          headerTitle: () => (
            <Header navigation={navigation} title={"Projects"} />
          ),
        };
      },
    },
    AddProject: {
      screen: AddProjectScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: () => (
            <Header
              navigation={navigation}
              title={"Add Project"}
              drawer={false}
            />
          ),
        };
      },
    },

    ProjectDetail: {
      screen: ProjectDetailScreen,
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

const bgcolor = "#426885";

export default ProjectNavigation;
