import React from "react"
import {View, Button, Stylesheet, TextInput,  Dimensions, TouchableOpacity, Text, Switch, Image, StyleSheet} from "react-native"
import { withFirebaseHOC } from "../config/Firebase"
import {Icon, withTheme} from 'react-native-elements'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'

const {width, height} =Dimensions.get('window')

const styles = StyleSheet.create({
    upperContainer:{
        backgroundColor:'#38434f',
        minWidth:width,
        height:height/8,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'white',
        borderTopWidth:width/500,
        borderBottomWidth:width/500
    },
    icon:{
        alignItems:'center',
    },
    formContainer:{
        borderColor:'white',
        borderWidth:width/500,
        height: (925/1950)*height,
        width:(75/105)*width,
        top:height*(275/1970),
        marginLeft:(175/1050)*width,
        borderRadius:width/100,
    },
    button:{
        width:(375/1050)*width,
        height:height*(10/195),
        borderRadius:width/30,
        borderWidth:0.5,
        borderColor:'#6e63c4',
        marginLeft:0,
    },
    text1:{
        paddingTop:height/36,
        fontWeight:'bold',
        textAlign:'center',
        color:'white',
        fontSize:height/35,
        borderBottomWidth:0.5,
        borderColor:'white',
        paddingBottom:height/144,
        borderBottomLeftRadius:10000000,
        borderBottomRightRadius:10000000,
    },
    text2:{
        textAlign:'center',
        fontWeight:'bold',
        color:'white',
        paddingTop:height/12,
        paddingBottom:height/60
    },
    textbox:{
        alignSelf:'center',
        backgroundColor:'white',
        borderRadius:5,
        width:(4.5/7)*width,
        fontWeight:'bold',
        textAlign:'center',
        fontSize:height/30,
        height:(height)*(1/20)
    }
})

class CheckHours extends React.Component{
    constructor(props){
        super(props)
        this.state={
            buttonPress :false,
            EntryNumber: '20',
            buttonDisable: true
        }
        this.handleChangeText= this.handleChangeText.bind(this)
    }

    handleChangeText(EntryNumber){
        const len = EntryNumber.length
        if(len<11)
            this.setState({EntryNumber,buttonDisable:true})
        else if(len==11)
            this.setState({EntryNumber,buttonDisable:false})
    }

    render(){
        return(
            <View style={{flexDirection:'column', height:height*(0.85)}}>
                <View style={styles.upperContainer}>
                    <FontAwesomeIcon style={styles.icon} size={width/6} icon={faSearch}  color='white'/>
                </View>
                <View style={styles.formContainer}>
                        <Text style={styles.text1}>
                            CHECK NSS HOURS
                        </Text>   
                        <Text style={styles.text2}>
                            ENTRY NUMBER
                        </Text>
                        <TextInput onChangeText={this.handleChangeText} value={this.state.EntryNumber} style={styles.textbox}/>

                        <TouchableOpacity disabled={this.state.buttonDisable} style={{...styles.button, top:height/12, left: width/6}} onPress={()=>{alert("You pressed 'Check !'")}}>
                            <Image style={styles.button} source={require('../assets/CheckButton1.jpg')}/>
                        </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default withFirebaseHOC(CheckHours)