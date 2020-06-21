import React, {Component, Fragment } from 'react';
import {StyleSheet, Text, View,Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { withFirebaseHOC } from "../config/Firebase";
import * as firebase from "firebase";
import { Icon, Picker,Button} from 'native-base';
import { Input } from "react-native-elements";
import { Formik } from 'formik';
import * as Yup from "yup";
import FormInput from '../components/FormInput';
import ErrorMessage from "../components/ErrorMessage";
import FormButton from "../components/FormButton";
import { ScrollView } from 'react-native-gesture-handler';


// todo 1. unique name to images 2.yellow error 
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(3, "Name must have at least 3 characters"),
  });

class EditTeam extends Component{
    state={
            imageurl:"",
            image:"",
            selected: "Executive",
            member:[],
    }
    componentDidMount(){
        this.state.member=this.props.navigation.state.params.data;
        this.state.image = this.state.member.profile_image;
        this.state.imageurl=this.state.member.profile_image;
        this.state.selected = this.state.member.designation;
        this.forceUpdate();
        
    }

  
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    
    if (!result.cancelled) {
       this.state.image = result.uri;
       this.forceUpdate();
    }
  };

  onValueChange(value) {
    this.setState({
        selected: value
    });
    this.state.selected =  value;
  }
  
  handleOnSubmit = async (values,actions) =>{
    if(this.state.image && (this.state.image!=this.state.member.profile_image))
    {
      console.log("with uploading image");
      this.uploadImage(this.state.image,values,actions);
    }
    else
    {
      console.log("without uploading image");
      this.addMember(values,actions);    
    }
  }

  addMember = async(values,actions) =>{
    const{name, phone,email, website, hostel,bio}=values;
    const profile_image = this.state.imageurl;
    const designation = this.state.selected;
    const memeberData = {name, phone,email, website, hostel,bio, profile_image,designation };
    await firebase.firestore().collection("TeamMember").doc(name).update(memeberData);
    
    try {
      this.props.navigation.goBack();
    } catch (error) {
    }
  }

  uploadImage = async (uri,values,actions)=>{
    const response = await fetch(uri);
    const blob = await response.blob(); 
    var ref = firebase.storage().ref().child("Member_Images/"+uri.split("/").pop());
    ref.put(blob)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot =>{
          if(snapshot.state==firebase.storage.TaskState.SUCCESS)
          {
          }
        },
        error => {
          unsubscribe();
        },
        ()=>{
          ref.getDownloadURL()
          .then((downloadUrl)=>{
            this.state.imageurl = downloadUrl;
            this.addMember(values,actions)
          })
        }
      )
  }

  render(){      
    return (
        <ScrollView>
            <View style={{alignItems:"center"}}>
            {/* do similar change in ass team member*/}
            {(this.state.image=="") && <Image source={require('../assets/avatar.png')} style={{height: 200, width:200, resizeMode: 'stretch', borderColor:"black", borderWidth:1}}/>}
            {(this.state.image!="") && <Image source={{uri:this.state.image}} style={{ width: 200, height: 200, borderColor:"black", borderWidth:1}}/>}
            <Button bordered iconLeft transparent dark onPress={this.pickImage}>
              <Icon name="add" dark/>
              <Text style={{marginLeft:10, marginRight:10}}>Pick Image</Text>
            </Button>
            </View>
            <Formik
                enableReinitialize
                initialValues={{
                    name:this.state.member.name,
                    phone:this.state.member.phone,
                    email:this.state.member.email,
                    website:this.state.member.website,
                    hostel:this.state.member.hostel,
                    bio:this.state.member.bio,
                }}
                onSubmit={(values, actions) => {
                  this.handleOnSubmit(values, actions);
                }}
                validationSchema={validationSchema}
            >
                {({
                    handleChange,
                    values,
                    handleBlur,
                    handleSubmit,
                    errors,
                    isValid,
                    touched,
                    isSubmitting,
                })=>(
                    <Fragment>
                        <Picker
                        note
                        mode="dropdown"
                        style={{marginRight:15, marginLeft:15}}
                        selectedValue={this.state.selected}
                        onValueChange={this.onValueChange.bind(this)}
                        >
                        <Picker.Item label="Executive" value="Executive" />
                        <Picker.Item label="Secretary" value="Secretary" />
                        <Picker.Item label="General Secretary" value="General Secretary" />
                        <Picker.Item label="Team Mentor" value="Team Mentor" />
                        <Picker.Item label="PG Rep" value="PG Rep" />
                        <Picker.Item label="Faculty Advisor (Education)" value="Faculty Advisor (Education)" />
                        <Picker.Item label="Faculty Advisor (Environment)" value="Faculty Advisor (Environment)" />
                        <Picker.Item label="Faculty Advisor (Health)" value="Faculty Advisor (Health)" />
                        <Picker.Item label="Faculty Advisor (Society)" value="Faculty Advisor (Society)" />
                        <Picker.Item label="Co-ordinator NSS IIT Delhi" value="Co-ordinator NSS IIT Delhi" />
                        </Picker>
    
                        {console.log("name"+this.state.membername )}
                        {console.log("name"+values.name )}
                        
                        <FormInput
                            name="name"
                            value={values.name}
                            onChangeText={handleChange("name")}
                            placeholder="Enter Name"
                            iconName="md-person"
                            iconColor="#2C384A"
                            onBlur={handleBlur("name")}
                        />
                        <ErrorMessage errorValue={touched.name && errors.name} />
        
                        <FormInput
                            name="phone"
                            value={values.phone}
                            onChangeText={handleChange("phone")}
                            placeholder="Contact Number"
                            iconName="md-call"
                            iconColor="#2C384A"
                            keyboardType={'numeric'}
                            onBlur={handleBlur("name")}
                        />
                        <ErrorMessage errorValue={touched.phone && errors.phone} />
              

                        <FormInput
                            name="email"
                            value={values.email}
                            onChangeText={handleChange("email")}
                            placeholder="Email"
                            iconName="md-mail"
                            iconColor="#2C384A"
                            onBlur={handleBlur("name")}
                        />
                        <ErrorMessage errorValue={touched.email && errors.email} />
              

                        <FormInput
                            name="website"
                            value={values.website}
                            onChangeText={handleChange("website")}
                            placeholder="Website"
                            iconName="md-link"
                            iconColor="#2C384A"
                            onBlur={handleBlur("name")}
                        />
                        <ErrorMessage errorValue={touched.website && errors.website} />

                        <FormInput
                            name="hostel"
                            value={values.hostel}
                            onChangeText={handleChange("hostel")}
                            placeholder="Hostel or Address"
                            iconName="md-home"
                            iconColor="#2C384A"
                            onBlur={handleBlur("name")}
                        />
                        <ErrorMessage errorValue={touched.hostel && errors.hostel} />
              
                        
                        <View style={{
                            marginRight:15,
                            marginLeft:15,
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}>
                            <Icon name="md-print"/>
                            <Text style={{
                                    fontSize: 16,
                                    margin:10,
                                    color: "black"
                                }}>Description :</Text>
                            
                        </View>
                        <Input
                            // style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            // onChangeText={handleChange("bio")}
                            // value={values.bio}
                            name="bio"
                            value={values.bio}
                            multiline={true}
                            onChangeText={handleChange("bio")}
                            placeholder="Type Here"
                            onBlur={handleBlur("name")}
                            
                        />
                        <ErrorMessage errorValue={touched.bio && errors.bio} />  
                        <View style={{margin:25}}>
                          <FormButton
                            buttonType="outline"
                            title="Update"
                            onPress={handleSubmit}
                            buttonColor="black"
                            disabled={!isValid || isSubmitting}
                            loading={isSubmitting}
                          />
                        </View>
                        <ErrorMessage errorValue={errors.general} />     
                                         
                    </Fragment>
                )}
            </Formik>
        </ScrollView>
      );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });
export default withFirebaseHOC(EditTeam);