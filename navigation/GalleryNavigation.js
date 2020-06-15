import { createStackNavigator } from "react-navigation-stack";
import Gallery from "../screens/Gallery";
import Header from "../shared/Header";
import React from 'react';

const GalleryNavigation = createStackNavigator(
  {
    Gallery: { 
      screen: Gallery,
      navigationOptions:({navigation})=> {
        return{
          headerTitle: ()=><Header navigation={navigation} title={'Gallery NSS'} drawer={true}/>,
        }
      } 
    }
  }
);
export default GalleryNavigation;