import React ,{Component}from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Image, Alert } from 'react-native';
import { Formik } from 'formik';
// import firestore from '@react-native-firebase/firestore';
import firebase from "firebase";
import { Container } from 'native-base';

 class AddEventScreen extends Component{
  render(){
        return(<View>
            <Text>add event</Text></View>)
    }
 }
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        maxHeight: 100,

        marginVertical: 5,
        marginHorizontal: 5,
        borderColor: 'gray', borderWidth: 1,

    }
});

export default AddEventScreen;