import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/Home";
import Header from "../shared/Header";
import React from 'react';

const AppNavigation = createStackNavigator(
  {
    Home: { 
      screen: Home,
      navigationOptions:({navigation})=> {
        return{
          headerTitle: ()=><Header navigation={navigation} title={'NSS IIT-D'}/>,
        }
      }
    }
  }
);

export default AppNavigation;
