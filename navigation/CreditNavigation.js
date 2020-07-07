import { createStackNavigator } from "react-navigation-stack";
import Credits from "../screens/Credits";
import Header from "../shared/Header";
import React from 'react';

const CreditsNavigation = createStackNavigator(
  {
    Credits: { 
      screen: Credits,
      navigationOptions:({navigation})=> {
        return{
          headerTitle: ()=><Header navigation={navigation} title={'Credits'} drawer={true}/>,
        }
      } 
    }
  },{
    defaultNavigationOptions: {
      headerTintColor: "white",
    },
  }
);
export default CreditsNavigation;