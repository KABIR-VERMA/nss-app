import { createStackNavigator } from "react-navigation-stack";
import ContactUs from "../screens/ContactUs";
import Header from "../shared/Header";
import React from 'react';

const ContactUsNavigation = createStackNavigator(
  {
    ContactUs: { 
      screen: ContactUs,
      navigationOptions:({navigation})=> {
        return{
          headerTitle: ()=><Header navigation={navigation} title={'Contact NSS'}/>,
        }
      } 
    }
  }
);
export default ContactUsNavigation;