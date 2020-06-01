import { createStackNavigator } from "react-navigation-stack";
import Team from "../screens/Team";
import Header from "../shared/Header";
import React from 'react';

const TeamNavigation = createStackNavigator(
  {
    Team: { 
      screen: Team,
      navigationOptions:({navigation})=> {
        return{
          headerTitle: ()=> <Header navigation={navigation} title={'Team NSS'}/>,
        }
      } 
    }
  }
);
export default TeamNavigation;