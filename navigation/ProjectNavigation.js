import createAppContainer from "react-navigation";
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";

import CategoryScreen from "../screens/Projects/Category";
import ProjectDetailScreen from "../screens/Projects/ProjectDetail";
import ProjectListScreen from "../screens/Projects/ProjectList";
import AddProjectScreen from "../screens/Projects/AddProject";

import Header from "../shared/Header";
import React from "react";

const ProjectNavigation = createStackNavigator({
  Categories: {
    screen: CategoryScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerStyle: headerStyle,
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
        headerStyle: headerStyle,
        // headerTitle: () => (
        //   <Header navigation={navigation} title={"Projects"} />
        // ),
      };
    },
  },
  AddProject: {
    screen: AddProjectScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerStyle: headerStyle,
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
});

const bgcolor = "#426885";

const headerStyle = {
  backgroundColor: bgcolor,
};

export default ProjectNavigation;
