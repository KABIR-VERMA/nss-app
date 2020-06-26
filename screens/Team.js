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
} from "react-native";
import { Button, Icon, Fab, Card, CardItem, Body } from "native-base";
import { withFirebaseHOC } from "../config/Firebase";
import * as firebase from "firebase";
import Gradient from "../components/Gradient";
import { Ionicons } from "@expo/vector-icons";
import Carousel, { Pagination } from "react-native-snap-carousel";
// import { TouchableOpacity } from "react-native-gesture-handler";

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
        const TeamMentor = [];
        const GeneralSecretary = [];
        const Secretary = [];
        const Executive = [];
        const PGRep = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          switch (data.designation) {
            case "PG Rep":
              PGRep.push(data);
              break;
            case "Executive":
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
        <View style={{ marginVertical: 10 }}>
          {this.renderModal()}
          {this.renderSectionList()}
          {this.addMemberButton()}
        </View>
      </Gradient.diagonalGradient>
    );
  }

  renderSectionList = () => {
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
          { title: "CO-ORDINATOR", data: this.state.Coordinator },
          { title: "FACULTY ADVISORS", data: this.state.FacultyAdvisor },
          { title: "TEAM MENTORS", data: this.state.TeamMentor },
          { title: "GENERAL SECRETARIES", data: this.state.GeneralSecretary },
          { title: "SECRETARIES", data: this.state.Secretary },
          { title: "EXECUTIVES", data: this.state.Executive },
          { title: "PG REPRESENTATIVES", data: this.state.PGRep },
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
    console.log(section);
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
            loop={arr.lenght > 3 ? true : false}
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
          <CardItem style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
            <Body style={{ backgroundColor: "transparent" }}>
              {item.name != "" && <Text style={styles.text}>{item.name}</Text>}
              {item.phone != "" && (
                <Text style={styles.text}>{item.phone}</Text>
              )}
              {item.email != "" && (
                <Text
                  style={styles.text}
                  adjustsFontSizeToFit
                  numberOfLines={1}
                >
                  {item.email}
                </Text>
              )}
              {item.hostel != "" && (
                <Text style={styles.text}>{item.hostel}</Text>
              )}
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
                      <Text style={styles.text}>{this.state.item.name}</Text>
                      <Text style={styles.text}>
                        {this.state.item.designation}
                      </Text>
                      {this.state.item.phone != "" && (
                        <Text style={styles.text}>{this.state.item.phone}</Text>
                      )}
                      {this.state.item.email != "" && (
                        <Text style={styles.text}>{this.state.item.email}</Text>
                      )}
                      {this.state.item.hostel != "" && (
                        <Text style={styles.text}>
                          {this.state.item.hostel}
                        </Text>
                      )}
                      {this.state.item.website != "" && (
                        <Text
                          style={{ color: "yellow" }}
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
                          {this.state.item.website}
                        </Text>
                      )}
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
                    {this.myButton("Edit", this.editMember)}
                    {this.myButton("Delete", this.deleteMember)}
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
    // backgroundColor: "rgba(197,106,153, 0.5)",
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
  },
});
export default withFirebaseHOC(Team);
