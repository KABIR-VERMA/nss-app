import React,{ Component }  from "react";
import { Text, View,RefreshControl,FlatList,StyleSheet,Image,SectionList, Alert,TouchableWithoutFeedback,Modal,Dimensions, Linking } from "react-native";
import {Button, Icon, Fab,Card, CardItem, Body } from 'native-base';
import { withFirebaseHOC } from "../config/Firebase";
import * as firebase from "firebase";


function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

class Team extends Component{
  
    state={
      Coordinator:[],
      FacultyAdvisor:[],
      TeamMentor:[],
      GeneralSecretary:[],
      Secretary:[],
      Executive:[],
      PGRep:[],
      item:null,
      modalVisible:false
    }
    componentDidMount(){
      let query = firebase.firestore().collection('TeamMember').get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          } 
          const Coordinator=[]
          const FacultyAdvisor=[]
          const TeamMentor=[]
          const GeneralSecretary=[]
          const Secretary=[]
          const Executive=[]
          const PGRep=[]
          snapshot.forEach(doc => {
            const data = doc.data();
            switch (data.designation){
              case "PG Rep":
                PGRep.push(data)
                break;
              case "Executive":
                Executive.push(data)
                break;
              case "Secretary":
                Secretary.push(data)
                break;
              case "General Secretary":
                GeneralSecretary.push(data)
                break;
              case "Team Mentor":
                TeamMentor.push(data)
                break;
              case "Faculty Advisor (Education)":
                FacultyAdvisor.push(data)
                break;
              case "Faculty Advisor (Environment)":
                FacultyAdvisor.push(data)
                break;
              case "Faculty Advisor (Health)":
                FacultyAdvisor.push(data)
                break;
              case "Faculty Advisor (Society)":
                FacultyAdvisor.push(data)
                break;
              case "Co-ordinator NSS IIT Delhi":
                Coordinator.push(data)
                break;
              default:         
            }    
          })
          this.state.Coordinator=Coordinator
          this.state.FacultyAdvisor=FacultyAdvisor
          this.state.TeamMentor=TeamMentor
          this.state.GeneralSecretary=GeneralSecretary
          this.state.Secretary=Secretary
          this.state.Executive=Executive
          this.state.PGRep=PGRep
          this.forceUpdate();          
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });            
    }

    handleAddTeam = () => {
        try {
          this.props.navigation.navigate("AddTeam");
        } catch (error) {
          console.log(error);
        }
      };
    onRefresh=()=>{
      this.componentDidMount();
      wait(200).then(()=>(this.state.refreshing=false))
    }
    openModal=(item)=>{
     this.state.item = item;
     this.state.modalVisible=true;
     this.forceUpdate();
    }
    closeModal=()=>{
      this.state.item = null;
      this.state.modalVisible=false;
      this.forceUpdate();
    }

    editMember=()=>{
      
      this.state.modalVisible=false;
      this.forceUpdate();
      try {
        console.log()
        this.props.navigation.navigate("EditTeam",{data:this.state.item});
      } catch (error) {
        console.log(error);
      }
    }

    deleteMember=()=>{
      firebase.firestore().collection('TeamMember').doc(this.state.item.name).delete();
      this.state.item = null;
      this.state.modalVisible=false;
      this.onRefresh();
    }
    FlatListItemSeparator = () => {
      return (
        <View style={{height: 0, width: '100%', backgroundColor: '#C8C8C8'}}/>
      );
    };
    
    render(){
        return(
        <View style={{ flex: 1 }}>
          <View style={{}}>
          <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            {this.state.item && <Card transparent style={styles.modalitem} >
              <CardItem >
                <Image source={this.state.item.profile_image.toString().length>4
                  ? {uri: this.state.item.profile_image}
                  : require('../assets/avatar.png')} style={{height: 200, width: 200, flex: 1}}/>
              </CardItem>
              <CardItem>
                <Body>
                  <Text >{this.state.item.name}</Text>
                  <Text >{this.state.item.designation}</Text>
                  {(this.state.item.phone!="") &&<Text >{this.state.item.phone}</Text>}
                  {(this.state.item.email!="") &&<Text >{this.state.item.email}</Text>}
                  {(this.state.item.hostel!="") &&<Text >{this.state.item.hostel}</Text>}
                  {(this.state.item.website!="") &&<Text style={{color: 'blue'}} onPress={() => Linking.openURL(this.state.item.website)}>{this.state.item.website}</Text>}
                  {(this.state.item.bio!="") &&<Text >{this.state.item.bio}</Text>}
                </Body>
              </CardItem>
              <CardItem footer style={{alignSelf:"center"}}>
                  <Button iconLeft light bordered onPress={this.closeModal} style={{padding:5, margin:5}}>
                    <Text>Close</Text>
                  </Button>
                  <Button iconLeft light bordered onPress={this.editMember}style={{padding:5, margin:5}}>
                    <Text>Edit</Text>
                  </Button>
                  <Button iconLeft light bordered onPress={this.deleteMember}style={{padding:5, margin:5}}>
                    <Text>Delete</Text>
                  </Button>
              </CardItem>
            </Card>}
            </View>
          </View>
          </Modal>
          </View>
          <SectionList
            refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>}      
            contentContainerStyle={styles.grid}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            sections={[
              { title: 'CO-ORDINATOR', data: this.state.Coordinator },
              { title: 'FACULTY ADVISORS', data: this.state.FacultyAdvisor },
              { title: 'TEAM MENTORS', data: this.state.TeamMentor },
              { title: 'GENERAL SECRETARIES', data: this.state.GeneralSecretary },
              { title: 'SECRETARIES', data: this.state.Secretary },
              { title: 'EXECUTIVES', data: this.state.Executive },
              { title: 'PG REPRESENTATIVES', data: this.state.PGRep },
            ]}
            renderSectionHeader={({ section }) => (
              <View style={styles.SectionHeaderStyle}>
                <View style={{borderBottomColor: 'black',borderBottomWidth: 1}}/>
                <Text style={{alignSelf:"center", fontSize:22}}> {section.title} </Text>
                <View style={{borderBottomColor: 'black',borderBottomWidth: 1}}/>
              </View>
              
            )}
            renderItem={({ section,index}) => (
              // Single Comes here which will be repeatative for the FlatListItems
              <FlatList
                contentContainerStyle={styles.grid}
                numColumns={2}
                data={section.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  if(index==0)
                  {
                    return (
                      <TouchableWithoutFeedback onPress={()=>this.openModal(item)}>
                          <Card transparent style={styles.item} >
                          <CardItem cardBody>
                            <Image source={(item.profile_image!="")
                              ? {uri: item.profile_image}
                              : require('../assets/avatar.png')} style={styles.cardImage}/>
                          </CardItem>
                          <CardItem >
                            <Body>
                            {(item.name!="") &&<Text >{item.name}</Text>}
                              {(item.phone!="") && <Text >{item.phone}</Text>}
                              {(item.email!="") && <Text adjustsFontSizeToFit numberOfLines={1} >{item.email}</Text>}
                              {(item.hostel!="") &&<Text >{item.hostel}</Text>}
                            </Body>
                          </CardItem>
                        </Card>
                      </TouchableWithoutFeedback>
                    )
                  }
                }
                }
                />
            )}
          />
        <Fab
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={this.handleAddTeam}>
            <Icon name="md-person-add" />
        </Fab>
        </View>        
        );
    }
}

var styles = StyleSheet.create({
  item: {
    margin: 5,
    width: Math.round(Dimensions.get('window').width/2.2),
    color: 'white'
  },
  grid: {
    marginBottom: 32,
    marginTop: 16,
    alignItems: 'center'
  },
  SectionHeaderStyle: {
    padding: 10,
    color: 'black',
  },
  cardImage:{
    height: Math.round(Dimensions.get('window').width/2),
    
    width: null,
    flex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(197,106,153, 0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 2,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalitem: {
    margin: 5,
    width: Math.round(Dimensions.get('window').width * 0.8),
    
    color: 'white'
  },
  
})
export default withFirebaseHOC(Team);