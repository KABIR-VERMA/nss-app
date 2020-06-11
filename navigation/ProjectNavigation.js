import createAppContainer from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";

import CategoryScreen from '../screens/Projects/Category';
import ProjectDetailScreen from '../screens/Projects/ProjectDetail';
import ProjectListScreen from "../screens/Projects/ProjectList";
import AddProjectScreen from "../screens/Projects/AddProject";

import Header from "../shared/Header";
import React from 'react';



const ProjectNavigation = createStackNavigator(
    {
        Categories: {
            screen: CategoryScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: () => <Header navigation={navigation} title={'Projects'} />,
                }
            }
        },
        ProjectList: {
            screen: ProjectListScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: () => <Header navigation={navigation} title={'Projects'} />,
                }
            }
        },
        AddProject: {
            screen: AddProjectScreen,

        },

        ProjectDetail: {
            screen: ProjectDetailScreen,
        },


    },


);


export default ProjectNavigation;