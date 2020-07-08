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
import { Ionicons, FontAwesome, AntDesign} from "@expo/vector-icons";
import Carousel, { Pagination } from "react-native-snap-carousel";
import creditsData from "./credits-data";
// import { TouchableOpacity } from 'react-native-gesture-handler';

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

class Credits extends Component {
  state = {
    developers: [],
    item: null,
    modalVisible: false,
  };
  componentDidMount() {
    this.state.developers = creditsData;
    this.forceUpdate();
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
          { title: 'DEVELOPERS', data: this.state.developers },
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
                  : item.image_source
              }
              style={styles.cardImage}
            />
          </CardItem>
          <CardItem style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
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
        <Text style={{ alignSelf: "center", fontSize: 40, color: "white" }}>
          {"  "}
          {section.title}{"  "}
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
                          : this.state.item.image_source
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
                            <Text style={{fontSize:15, textAlignVertical:'center'}}>
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
                                <Text style={{fontSize:15}}>
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
                            <Text style={{fontSize:15}}>
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
                        <Text style={{fontSize:15}}>
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
    marginBottom: 'auto',
    marginTop: 'auto',
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
});
export default withFirebaseHOC(Credits);
