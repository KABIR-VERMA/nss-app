import React from "react";
import {View, Stylesheet, Dimensions, TouchableOpacity, Text, Switch, Image, StyleSheet} from "react-native";
import { withFirebaseHOC } from "../config/Firebase";
import {Icon} from 'react-native-elements'
import { Button } from "native-base";
import HoursButton from './HoursButton'
import { faExclamationTriangle, faSearch } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import CheckHours from "./CheckHours";
import Complaint from "./Complaint";


const {height,width} = Dimensions.get('window')
const p = ((4/5)*height)-width


class HoursSelect extends React.Component{
    constructor(props){
        super(props)
        this.state={
            mode:'select'
        }
        this.getComp=this.getComp.bind(this)
        this.handlePressCheck=this.handlePressCheck.bind(this)
        this.handlePressComplaint=this.handlePressComplaint.bind(this)
    }

    handlePressCheck(){
        this.setState({mode:'check'})
    }

    handlePressComplaint(){
        this.setState({mode:'complaint'})
    }

    getComp=()=>{
        if(this.state.mode=='select')
            return(<View
                style={{
                    alignItems:"center",
                    justifyContent:'center',
                }}>
                    <View
                    style={{backgroundColor:'#38434f', minWidth:400, minHeight:50, justifyContent:'center'}}>
                    <Text style={{fontWeight:'bold', textAlign:'center',color: 'white', fontSize: 25,top:12.5}}>
                        HOURS
                        {"\n"}
                    </Text>
                    </View>
                        <HoursButton width={width/2} height={width/2} pTop={p/(5)} pBottom={p/5} bRadius={width/3} txt={'CHECK\nHOURS'}  msg={'Hours has been Pressed'} icon={faSearch} handlePress={this.handlePressCheck}/>
                        <HoursButton width={width/2} height={width/2} pTop={p/(5)} pBottom={p/5} bRadius={width/3} txt={'HOURS\nCOMPLAINT'} msg={'Complaint has been Pressed'} icon={faExclamationTriangle} handlePress={this.handlePressComplaint}/>
                    </View>)
        else if(this.state.mode=='check')
            return (<CheckHours/>)
        else
                return(<Complaint/>)
        
    }

    render(){
        const a = this.getComp()
        return(a)
           }
}

var styles = StyleSheet.create({
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5
    },
    buttonText: {
      fontSize: 18,
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      margin: 10,
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
  });
export default withFirebaseHOC(HoursSelect);