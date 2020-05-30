import { createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import AppNavigation from './AppNavigation';
import AboutUsNavigation from './AboutUsNavigation';
import ContactUsNavigation from './ContactUsNavigation';
import GalleryNavigation from './GalleryNavigation';
import HoursNavigation from './HoursNavigation';
import TeamNavigation from './TeamNavigation';
import React ,{Component}from 'react'
import {  SafeAreaView } from 'react-navigation';
import {View, ScrollView, StyleSheet, Image} from 'react-native';


const RootDrawerNavigator = createDrawerNavigator({
    Home : {
        screen: AppNavigation
    },
    AboutUs:{
        screen:AboutUsNavigation
    },
    ContactUs:{
        screen:ContactUsNavigation
    },
    Gallery:{
        screen:GalleryNavigation
    },
    Team:{
        screen: TeamNavigation
    },
    Hours:{
        screen:HoursNavigation
    }
},{
    contentComponent: props => (
        <SafeAreaView style={styles.container}>
            <View style={{height: 150, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../assets/nss.jpg')} style={{height: 150, width:150, resizeMode: 'stretch'}}></Image>
            </View>
          <ScrollView>
            <DrawerItems {...props} />
          </ScrollView>
        </SafeAreaView>
      )
});

const styles = StyleSheet.create({
    container: {
      padding:30,
      flex: 1,
    },
  });
export default RootDrawerNavigator;
