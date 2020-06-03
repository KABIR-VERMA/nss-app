import { createStackNavigator } from "react-navigation-stack";
import Hours from "../screens/Hours";
import Header from "../shared/Header";
import React from 'react';

const HoursNavigation = createStackNavigator(
  {
    Hours: { 
      screen: Hours,
      navigationOptions:({navigation})=> {
        return{
          headerTitle: ()=><Header navigation={navigation} title={'Hours NSS'}/>,
        }
      } 
    }
  }
);
export default HoursNavigation;