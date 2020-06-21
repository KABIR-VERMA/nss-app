import { createStackNavigator } from "react-navigation-stack";
import Contact from "../screens/ContactUs";
import Header from "../shared/Header";
import React from 'react';

const ContactUsNavigation = createStackNavigator(
  {
    Contact: { 
      screen: Contact,
      navigationOptions:({navigation})=> {
        return{
          headerTitle: ()=><Header navigation={navigation} title={'Contact NSS'} drawer={true}/>,
        }
      } 
    }
  }
);
export default ContactUsNavigation;