import { createStackNavigator } from "react-navigation-stack";
import AboutUs from "../screens/AboutUs";
import Header from "../shared/Header";
import React from 'react';

const AboutUsNavigation = createStackNavigator(
  {
    AboutUs: { 
      screen: AboutUs,
      navigationOptions:({navigation})=> {
        return{
          headerTitle: ()=><Header navigation={navigation} title={'About NSS'}/>,
        }
      } 
    }
  }
);
export default AboutUsNavigation;