import createAppContainer from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";

import CategoryScreen from '../screens/Projects/Category';
import Header from "../shared/Header";
import React from 'react';
import ProjectDetailScreen from '../screens/Projects/ProjectDetail';
import ProjectListScreen from '../screens/Projects/ProjectList';



const ProjectNavigation = createStackNavigator(
    {
      Categories: { 
        screen: CategoryScreen,
        navigationOptions:({navigation})=> {
          return{
            headerTitle: ()=><Header navigation={navigation} title={'Projects'}/>,
          }
        } 
      }
    },
    {
        ProjectList: { 
          screen: ProjectListScreen,
        }
      },
      {
        ProjectDetail: { 
          screen: ProjectDetailScreen,
        }
      }
  );


export default ProjectNavigation;