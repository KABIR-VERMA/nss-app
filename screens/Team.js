import React, { Component } from "react";
import {
  Text,
  View,
  RefreshControl,
  FlatList,
  StyleSheet,
  Image,
  SectionList,
  Alert,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Button, Icon, Fab, Card, CardItem, Body } from "native-base";
import { withFirebaseHOC } from "../config/Firebase";
import * as firebase from "firebase";
import Gradient from "../components/Gradient";
import { Ionicons,AntDesign, FontAwesome} from "@expo/vector-icons";
import Carousel, { Pagination } from "react-native-snap-carousel";
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import { TouchableOpacity } from 'react-native-gesture-handler';

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

class Team extends Component {
  state = {
    Coordinator: [],
    FacultyAdvisor: [],
    TeamMentor: [],
    GeneralSecretary: [],
    Secretary: [],
    Executive: [],
    PGRep: [],
    ProjectRep:[],
    TechnicalHead:[],
    item: null,
    modalVisible: false,
  };
  componentDidMount() {
    let query = firebase
      .firestore()
      .collection("TeamMember")
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        const Coordinator = [];
        const FacultyAdvisor = [];
        const ProjectRep=[];
        const TeamMentor = [];
        const GeneralSecretary = [];
        const Secretary = [];
        const Executive = [];
        const PGRep = [];
        const TechnicalHead=[];
        snapshot.forEach((doc) => {
          const data = doc.data();
          switch (data.designation) {
            case "PG Rep":
              PGRep.push(data);
              break;
            case 'Project Rep':
              ProjectRep.push(data);
              break;
            case 'Technical Head':
              TechnicalHead.push(data);
            
            case 'Executive':
              Executive.push(data);
              break;
            case "Secretary":
              Secretary.push(data);
              break;
            case "General Secretary":
              GeneralSecretary.push(data);
              break;
            case "Team Mentor":
              TeamMentor.push(data);
              break;
            case "Faculty Advisor (Education)":
              FacultyAdvisor.push(data);
              break;
            case "Faculty Advisor (Environment)":
              FacultyAdvisor.push(data);
              break;
            case "Faculty Advisor (Health)":
              FacultyAdvisor.push(data);
              break;
            case "Faculty Advisor (Society)":
              FacultyAdvisor.push(data);
              break;
            case "Co-ordinator NSS IIT Delhi":
              Coordinator.push(data);
              break;
            default:
          }
        });
        this.state.Coordinator = Coordinator;
        this.state.FacultyAdvisor = FacultyAdvisor;
        this.state.TeamMentor = TeamMentor;
        this.state.GeneralSecretary = GeneralSecretary;
        this.state.Secretary = Secretary;
        this.state.Executive = Executive;
        this.state.PGRep = PGRep;
        this.state.ProjectRep=ProjectRep;
        this.state.TechnicalHead=TechnicalHead;

        this.forceUpdate();
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }

  handleAddTeam = () => {
    try {
      this.props.navigation.navigate("AddTeam");
    } catch (error) {
      console.log(error);
    }
  };
  onRefresh = () => {
    this.componentDidMount();
    wait(200).then(() => (this.state.refreshing = false));
  };
  openModal = (item) => {
    this.state.item = item;
    this.state.modalVisible = true;
    this.forceUpdate();
  };
  closeModal = () => {
    this.state.item = null;
    this.state.modalVisible = false;
    this.forceUpdate();
  };

  editMember = () => {
    this.state.modalVisible = false;
    this.forceUpdate();
    try {
      console.log();
      this.props.navigation.navigate("EditTeam", { data: this.state.item });
    } catch (error) {
      console.log(error);
    }
  };

  deleteMember = () => {
    firebase
      .firestore()
      .collection("TeamMember")
      .doc(this.state.item.name)
      .delete();
    this.state.item = null;
    this.state.modalVisible = false;
    this.onRefresh();
  };
  FlatListItemSeparator = () => {
    return (
      <View style={{ height: 0, width: "100%", backgroundColor: "#C8C8C8" }} />
    );
  };

  render() {
    return (
      <Gradient.diagonalGradient>
        <View style={{ marginVertical: 10, flex: 1 }}>
          {this.renderModal()}
          {this.renderSectionList()}
          {global.isAdmin ? this.addMemberButton() : null}
        </View>
      </Gradient.diagonalGradient>
    );
  }

  renderSectionList = () => {
    if (this.state.Executive.length == 0) {
      return (
        <View style={styles.screen}>
          <ActivityIndicator size={40} color="white" />
        </View>
      );
    }
    return (
      <SectionList
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
        contentContainerStyle={styles.grid}
        ItemSeparatorComponent={this.FlatListItemSeparator}
        sections={[
          { title: 'CO-ORDINATOR', data: this.state.Coordinator },
          { title: 'FACULTY ADVISORS', data: this.state.FacultyAdvisor },
          { title: 'TEAM MENTORS', data: this.state.TeamMentor },
          { title: 'GENERAL SECRETARIES', data: this.state.GeneralSecretary },
          { title: 'TECHNICAL HEAD', data: this.state.TechnicalHead },
          { title: 'SECRETARIES', data: this.state.Secretary },
          { title: 'EXECUTIVES', data: this.state.Executive },
          { title: 'PG REPRESENTATIVES', data: this.state.PGRep },
          { title: 'PROJECT REPRESENTATIVES', data: this.state.ProjectRep },
        ]}
        renderSectionHeader={({ section }) => {
          return this.renderSectionHeader(section);
        }}
        keyExtractor={(item, ind) => ind}
        renderItem={({ section, index }) => {
          // Single Comes here which will be repeatative for the FlatListItems
          return this.renderSection(section, index);
        }}
      />
    );
  };

  renderSection = (section, index) => {
    // console.log(section);
    if (index == 0) {
      return this.imageSlidingView(section.data);
    }
    return null;
    // return (
    //   <FlatList
    //     contentContainerStyle={styles.grid}
    //     style={{ marginBottom: 30 }}
    //     numColumns={2}
    //     data={section.data}
    //     keyExtractor={(item, ind) => ind.toString()}
    //     renderItem={({ item }) => {
    //       if (index == 0) {
    //         return this.singleTeamMemberItem(item);
    //       }
    //     }}
    //   />
    // );
  };

  imageSlidingView = (arr) => {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="md-arrow-dropleft"
            size={30}
            color="white"
            style={{ padding: "2%" }}
          />
          <Carousel
            style={{}}
            sliderWidth={width / 1.1}
            // sliderHeight={height / 5}
            itemWidth={width / 2}
            data={arr}
            renderItem={({ item }) => {
              return this.singleTeamMemberItem(item);
            }}
            // onBeforeSnapToItem={(index) =>
            //   this.setState({ activeSlide: index })
            // }
            loop={arr.length > 3 ? true : false}
            decelerationRate={1}
            firstItem={arr.length > 2 ? Math.floor(arr.length / 2) : 0}
            // hasParallaxImages={true}
          />
          <Ionicons
            name="md-arrow-dropright"
            size={30}
            color="white"
            style={{ padding: "2%" }}
          />
        </View>
      </View>
    );
  };

  singleTeamMemberItem = (item) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.openModal(item)}>
        <Card transparent style={styles.item}>
          <CardItem cardBody>
            <Image
              source={
                item.profile_image != ""
                  ? { uri: item.profile_image }
                  : require("../assets/avatar.png")
              }
              style={styles.cardImage}
            />
          </CardItem>
          <CardItem style={{ backgroundColor: "rgba(0,0,0,0.2)"}}>
            <Body style={{ backgroundColor: "transparent"}}>
              <View style={{marginLeft:'auto', marginRight:'auto'}}>
              {item.name != "" && <Text style={styles.text}>{item.name}</Text>}
              {item.hostel != "" && (
                <Text style={styles.text}>{item.hostel}</Text>
              )}
              </View>
              <View style={{flexDirection:'row', alignContent:'center', alignItems:'center',alignSelf:'center'}}>
              {item.phone != "" && (
                <TouchableOpacity
                onPress={() => {
                    Linking.openURL(`tel:${item.phone}`);
                  }}
                >
                <Ionicons
                  style={{padding:'10%'}}
                  name="md-call"
                  size={30}
                  color='white'
                >
                </Ionicons>
                </TouchableOpacity>
              )}
              {item.phone != "" && (
                    <TouchableOpacity
                    onPress={() => {
                        Linking.openURL(`https://wa.me/91${item.phone}`);
                      }}
                    >
                    <FontAwesome
                    name="whatsapp"
                    style={{padding: '10%'}}
                    size={30}
                    color='white'/>
                    </TouchableOpacity>
                  )}
              {item.email != "" && (
                <TouchableOpacity
                onPress={() => {
                    Linking.openURL(`mailto:${item.email}`);
                  }}
                >
                <Ionicons
                  name="md-mail"
                  style={{padding: '10%',}}
                  size={30}
                  color='white'
                />
                </TouchableOpacity>
              )}
              </View>
              <View style={{marginLeft:'auto',}}>
              <Text style={{color:'yellow'}}>
              Know More...
              </Text>
              </View>
            </Body>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  };

  renderSectionHeader = (section) => {
    return (
      <View style={styles.SectionHeaderStyle}>
        <View style={{ borderBottomColor: "white", borderBottomWidth: 1 }} />
        <Text style={{ alignSelf: "center", fontSize: 22, color: "white" }}>
          {" "}
          {section.title}{" "}
        </Text>
        <View style={{ borderBottomColor: "white", borderBottomWidth: 1 }} />
      </View>
    );
  };

  myButton = (name, onTap) => {
    return (
      <TouchableOpacity onPress={onTap} style={styles.buttonModal}>
        <Text style={{ ...styles.text, fontSize: 17 }}>{name}</Text>
      </TouchableOpacity>
    );
  };

  renderModal = () => {
    return (
      <View style={{}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView, { backgroundColor: "#426885" }]}>
              {this.state.item && (
                <Card transparent style={styles.modalitem}>
                  <CardItem style={{ backgroundColor: "transparent" }}>
                    <Image
                      source={
                        this.state.item.profile_image.toString().length > 4
                          ? { uri: this.state.item.profile_image }
                          : require("../assets/avatar.png")
                      }
                      style={{ height: 200, width: 200, flex: 1 }}
                    />
                  </CardItem>
                  <CardItem style={{ backgroundColor: "transparent" }}>
                    <Body>
                      <View style={{marginLeft:'auto', marginRight:'auto'}}>
                      <Text style={styles.text}>{this.state.item.name}</Text>
                      <Text style={styles.text}>
                        {this.state.item.designation}
                      </Text>
                      {this.state.item.hostel != "" && (
                        <Text style={styles.text}>
                          {this.state.item.hostel}
                        </Text>
                      )}
                      </View>
                      <View style={{flexDirection:'column', alignContent:'center', alignItems:'center',alignSelf:'center'}}>
                        {this.state.item.phone != "" && (
                        <TouchableOpacity 
                        onPress={() => {
                            Linking.openURL(`tel:${this.state.item.phone}`);
                        }}>
                          <Ionicons
                            raised
                            name="md-call"
                            size={25}
                            style={{padding:'3%'}}
                            color='white'
                          >
                            <Text style={{fontSize:15, textAlignVertical:'center', textDecorationLine:'underline'}}>
                            {" " + this.state.item.phone}
                            </Text>
                          </Ionicons>
                          </TouchableOpacity>
                        )}
                        {this.state.item.phone != "" && (
                              <TouchableOpacity 
                              onPress={() => {
                                Linking.openURL(`https://wa.me/91${this.state.item.phone}`);
                              }}>
                              <FontAwesome
                              raised
                              name="whatsapp"
                              style={{padding:'3%'}}
                              size={25}
                              color='white'
                              >
                                <Text style={{fontSize:15, textDecorationLine:'underline'}}>
                            {" " + this.state.item.phone}
                            </Text>
                            </FontAwesome>
                            </TouchableOpacity>
                            )}
                        {this.state.item.email != "" && (
                          <TouchableOpacity 
                          onPress={() => {
                            Linking.openURL(`mailto:${this.state.item.email}`);
                          }}
                          >
                          <Ionicons
                            raised
                            name="md-mail"
                            size={25}
                            style={{paddingVertical:'3%',marginLeft:'auto', marginRight:'auto'}}
                            color='white'
                          >
                            <Text style={{fontSize:15,  textDecorationLine:'underline'}}>
                            {" " + this.state.item.email}
                            </Text>
                          </Ionicons>
                          </TouchableOpacity>
                        )}
                        {(this.state.item.website != null && this.state.item.website !='') && (
                        <TouchableOpacity
                        onPress={() => {
                            var t = this.state.item.website;
                            t = t.substring(0, 4);
                            Linking.openURL(
                              t.localeCompare("http") == 0
                                ? t
                                : "https://" + this.state.item.website
                            );
                        }}
                        >
                        <AntDesign
                          raised
                          name='earth'
                          color='white'
                          size={25}
                          style={{paddingVertical:'3%',marginLeft:'auto', marginRight:'auto'}}
                        >
                        <Text style={{fontSize:15,  textDecorationLine:'underline'}}>
                            {" " + this.state.item.website}
                            </Text>
                        </AntDesign>
                        </TouchableOpacity>
                      )}
                      </View>                      
                      
                      {this.state.item.bio != "" && (
                        <Text style={styles.text}>{this.state.item.bio}</Text>
                      )}
                    </Body>
                  </CardItem>
                  <CardItem
                    footer
                    style={{
                      alignItems: "center",
                      alignSelf: "center",
                      backgroundColor: "transparent",
                    }}
                  >
                    {this.myButton("Close", this.closeModal)}
                    {global.isAdmin
                      ? this.myButton("Edit", this.editMember)
                      : null}
                    {global.isAdmin
                      ? this.myButton("Delete", this.deleteMember)
                      : null}
                  </CardItem>
                </Card>
              )}
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  addMemberButton = () => {
    return (
      <Fab
        containerStyle={{}}
        style={{ backgroundColor: "#5067FF" }}
        position="bottomRight"
        onPress={this.handleAddTeam}
      >
        <Icon name="md-person-add" />
      </Fab>
    );
  };
}

var styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    margin: 5,
    width: Math.round(Dimensions.get("window").width / 2.2),
    color: "white",
  },
  grid: {
    marginBottom: 32,
    marginTop: 16,
    alignItems: "center",
  },
  SectionHeaderStyle: {
    padding: 10,
    color: "white",
  },
  cardImage: {
    height: Math.round(Dimensions.get("window").width / 2),
    width: null,
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'rgba(197,106,153, 0.5)',
    backgroundColor: "rgba(0,0,0,0.7)",
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalitem: {
    margin: 5,
    width: Math.round(Dimensions.get("window").width * 0.8),

    color: "white",
  },

  carouselImage: {
    height: height / 5,
    width: width / 2,
    resizeMode: "stretch",
  },

  buttonModal: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
    margin: 5,
  },

  text: {
    color: "white",
    textAlign:'center'
  },
  link: {
    color: "white",
    textAlign:'center',
    textDecorationLine:"underline",
  }
});
export default withFirebaseHOC(Team);
