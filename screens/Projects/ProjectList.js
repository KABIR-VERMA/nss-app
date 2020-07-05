import React, { useState, Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  SafeAreaView,
  TouchableScale,
  // LinearGradient,
  TouchableOpacity,
  Image,
  Linking,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import DropDownItem from "react-native-drop-down-item";
import Expo from "expo";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
import { withFirebaseHOC } from "../../config/Firebase";
import Gradient from "../../components/Gradient";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Card, CardItem, Body } from "native-base";

// import { render } from "react-dom";
// import { render } from 'react-dom';

// import { PROJECTLIST } from "../../data/dummy-data";
// import ProjectCategoryGridTile from '../../components/ProjectGridTile';
// import { SafeAreaView } from 'react-navigation';

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

class ProjectListScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Hellooo",
  });

  constructor(props) {
    super();
    this.categoryTitle = props.navigation.getParam("title");
    this.state = {
      projectList: [],
      activeSlide: 0,
      isOpened: [],
      teamMembers: null,
      noData: false,
    };
  }

  componentDidMount = () => {
    let items = [];
    var isOpened = [];
    firebase
      .firestore()
      .collection("Projects")
      .where("category", "==", this.categoryTitle)
      .get()
      .then((e) => {
        e.forEach((doc) => {
          items.push(doc.data());
          isOpened.push(false);
        });
        this.sortProjects(items);
        if (items.length == 0) {
          this.setState({ noData: true });
          return;
        }
        this.setState({
          projectList: items,
          isOpened: isOpened,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    let query = firebase
      .firestore()
      .collection("TeamMember")
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        var teamMembers = {};
        snapshot.forEach((doc) => {
          const data = doc.data();
          teamMembers[data.name] = data;
        });
        this.setState({ teamMembers });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  };

  sortProjects = (arr) => {
    arr.sort((a, b) => a.title.localeCompare(b.title));
  };

  render() {
    let categoryTitle = this.props.navigation.getParam("title");
    // console.log("this.state", this.state);
    return (
      <Gradient.diagonalGradient>
        {this.state.projectList.length > 0 ? (
          <FlatList
            style={{ flex: 1 }}
            data={this.state.projectList}
            renderItem={({ item, index }) =>
              this.renderFlatListItem(item, index)
            }
            keyExtractor={(item, ind) => ind.toString()}
          />

        ) : <View style={styles.screen} ><ActivityIndicator size={50} color="white" /></View>}

        ) : this.state.noData == false ? (
          <View style={styles.screen}>
            <ActivityIndicator size={50} color="white" />
          </View>
        ) : (
          <View style={styles.screen}>
            <Text style={styles.text}>No Projects Currently</Text>
          </View>
        )

      </Gradient.diagonalGradient>
    );
  }

  renderFlatListItem = (project, ind) => {
    return (
      <View style={{}}>
        <TouchableOpacity
          onPress={() => {
            var open = this.state.isOpened;
            open[ind] = !open[ind];
            this.setState({ isOpened: open });
          }}
        >
          {this.renderHeaderFlatListItem(project, ind)}
        </TouchableOpacity>
        {this.state.isOpened[ind] ? (
          <View style={{ paddingBottom: "3%" }}>
            {project.imageArray != "-" && project.imageArray != ""
              ? this.imageSlidingView(project.imageArray)
              : null}
            {project.description != "-" && project.description != "" ? (
              <Text style={styles.text}>{project.description}</Text>
            ) : null}
            {project.members != "-" && project.members != "" ? (
              <View>
                <Text
                  style={{ ...styles.text, fontSize: 17, textAlign: "left" }}
                >
                  Contact Details:
                </Text>
                {this.imageSlidingView(project.members, true)}
              </View>
            ) : null}
            {global.isAdmin ? <Button
              onPress={() => {
                try {
                  this.props.navigation.navigate("EditProject", {
                    address: project.address,
                    category: project.category,
                    description: project.description,
                    iconUrl: project.iconUrl,
                    imageArray: project.imageArray,
                    members: project.members,
                    title: project.title,

                  });
                } catch (error) {
                  console.log(error);
                }
              }
              }
              title="Edit"
              color="black"
              accessibilityLabel="Learn more about this purple button"
            /> : null}

          </View>

        ) : null}

      </View>
    );
  };

  renderHeaderFlatListItem = (project, ind) => {
    return (
      <View
        style={[
          styles.dropDownHeader,
          {
            borderTopWidth: 1,
            borderBottomWidth:
              ind == this.state.projectList.length - 1
                ? 1
                : this.state.isOpened[ind]
                  ? 0.3
                  : 0,
            borderBottomColor: this.state.isOpened[ind]
              ? "grey"
              : ind == this.state.projectList.length - 1
                ? "white"
                : "none",
          },
        ]}
      >
        {project.iconUrl ? (
          <Image source={{ uri: project.iconUrl }} style={styles.projectIcon} />
        ) : null}
        <View>
          <Text style={styles.ProjectTitle}>{project.title}</Text>
          {project.address.localeCompare("-") == 0 ||
          project.address.localeCompare("") == 0 ? null : (
            <Text
              style={{
                fontSize: 14,
                color: "white",
                alignSelf: "center",
                textAlign: "center",
                maxWidth: width / 2.1,
              }}
            >
              ({project.address})
            </Text>
          )}


        </View>

        <Ionicons
          name="ios-arrow-down"
          size={24}
          color="white"
          style={{ position: "absolute", right: "3%" }}
        />
      </View>
    );
  };

  imageSlidingView = (arr, team = false) => {
    if (arr) {
      return (
        <View style={[styles.screen, { marginTop: "8%" }]}>
          <View style={[styles.screen, { flexDirection: "row" }]}>
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
              itemWidth={width / 1.6}
              data={arr}
              renderItem={({ item }) => {
                if (team) {
                  return this.singleTeamMemberItem(item);
                }
                return (
                  <Image source={{ uri: item }} style={styles.carouselImage} />
                );
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
          {/* <View style={{ top: -20 }}>
            <Pagination
              dotsLength={arr.length}
              activeDotIndex={this.state.activeSlide}
              containerStyle={{ backgroundColor: "transparent" }}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 3,
                backgroundColor: "white",
              }}
              inactiveDotStyle={{}}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </View> */}
        </View>
      );
    }
    return null;
  };

  singleTeamMemberItem = (member) => {
    var item = this.state.teamMembers[member];
    return (
      <Card transparent style={{ width: width / 1.6 }}>
        <CardItem cardBody>
          <Image
            source={
              item.profile_image != ""
                ? { uri: item.profile_image }
                : require("../../assets/avatar.png")
            }
            style={styles.contactImage}
          />
        </CardItem>
        <CardItem style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
          <Body style={{ backgroundColor: "transparent" }}>
            {item.name != "" && (
              <Text style={{ color: "white" }}>{item.name}</Text>
            )}
            {item.phone != "" && (
              <Text
                style={{ color: "yellow" }}
                onPress={() => {
                  Linking.openURL(`tel:${item.phone}`);
                }}
              >
                {item.phone}
              </Text>
            )}
            {item.email != "" && (
              <Text
                style={{ color: "yellow" }}
                onPress={() => {
                  Linking.openURL(`mailto:${item.email}`);
                }}
              >
                {item.email}
              </Text>
            )}
            {item.hostel != "" && (
              <Text style={{ color: "white" }}>{item.hostel}</Text>
            )}
          </Body>
        </CardItem>
      </Card>
    );
  };
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  contactImage: {
    // height: Math.round(Dimensions.get("window").width / 2),
    // width: null,
    // flex: 1,
    height: height / 3,
    width: width / 1.6,
    resizeMode: "stretch",
  },

  contactItem: {
    margin: 5,
    width: Math.round(Dimensions.get("window").width / 2.2),
    color: "white",
  },

  text: {
    textAlign: "center",
    color: "white",
    margin: "6%",
    marginVertical: "3%",
    fontSize: 15,
  },

  dropDownHeader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: "1%",
    paddingBottom: "8%",
    borderColor: "white",
  },

  projectIcon: {
    position: "absolute",
    left: "3%",
    height: "90%",
    width: "20%",
    resizeMode: "contain",
  },

  ProjectTitle: {
    maxWidth: width / 2,
    textAlign: "center",
    fontSize: 17,
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
  },

  carouselImage: {
    height: height / 4,
    width: width / 1.6,
    resizeMode: "stretch",
  },

  listItem: {
    marginHorizontal: 5,
    justifyContent: "center",
    marginVertical: 1,
  },
});

export default withFirebaseHOC(ProjectListScreen);

// renderFlatListItem = () => {
// return (
//   <DropDownItem
//     // key={itemdata.index}
//     Key={itemdata.index}
//     contentVisible={false}
//     // invisibleImage={IC_ARR_DOWN}
//     // visibleImage={require('../../assets/avatar.png')}
//     header={this.renderHeaderFlatListItem(project)}
//   >
//     <View style={{ left: -11 }}>
//       {/* {this.imageSlidingView(project.item.imageArr)} */}
//       <Text
//         style={{
//           fontSize: 15,
//           textAlign: "center",
//           color: "white",
//           top: -10,
//           padding: 2,
//         }}
//       >
//         {project.item.description}
//       </Text>
//     </View>
//   </DropDownItem>
// );
// }
