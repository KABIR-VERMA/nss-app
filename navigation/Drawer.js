import { createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import AppNavigation from './AppNavigation';
import AboutUsNavigation from './AboutUsNavigation';
import ContactUsNavigation from './ContactUsNavigation';
import GalleryNavigation from './GalleryNavigation';
import HoursNavigation from './HoursNavigation';
import TeamNavigation from './TeamNavigation';
import React ,{Component}from 'react'
import {  SafeAreaView } from 'react-navigation';
import {View, ScrollView, Text, TouchableOpacity, StyleSheet, Image, AsyncStorage, Alert} from 'react-native';
import { Button} from "react-native-elements";



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
            <View style={{margin:8}}>
                <Button title="Logout" type="clear" buttonStyle={{ justifyContent: "flex-start" }} onPress={()=>
                    Alert.alert(
                        'Log out',
                        'Do you want to logout?',
                        [
                        {text: 'Cancel', onPress: () => {return null}},
                        {text: 'Confirm', onPress: () => {
                                        AsyncStorage.clear();
                                        props.navigation.navigate('Auth')
                        }},
                        ],
                    { cancelable: false }
                    )  
                } />
            </View>
             
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
