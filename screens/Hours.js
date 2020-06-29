import React from "react";
import {View, Dimensions, Stylesheet, ScrollView, TouchableOpacity, Text, Switch, StyleSheet} from "react-native";
import { withFirebaseHOC } from "../config/Firebase";
import {Icon} from 'react-native-elements'
import { Button, Container } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import Gradient from "../components/Gradient";
import HoursSelect from '../components/SelectHoursComplaint' 
import CheckHours from '../components/CheckHours'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


styles = StyleSheet.create({
    container : {
        backgroundColor : '#426685',
        flex :1
    }
})

class Hours extends React.Component{
    constructor(){
        super()
        this.state={
        }
    }

    handleCheckHours=()=>{
        this.setState({mode:'CheckHours'})
    }

    render(){
        return (
            <ScrollView style={styles.container}>
                {<HoursSelect/>}                
            </ScrollView> 
        )
    }
}

export default withFirebaseHOC(Hours);