import React, { useState, Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableScale,
  // LinearGradient,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import DropDownItem from "react-native-drop-down-item";
import Expo from "expo";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
import { withFirebaseHOC } from "../../config/Firebase";
import Gradient from "../../components/Gradient";
import Carousel, { Pagination } from "react-native-snap-carousel";
import dummyData from "./dummyData.json";

// import { render } from "react-dom";
// import { render } from 'react-dom';

// import { PROJECTLIST } from "../../data/dummy-data";
// import ProjectCategoryGridTile from '../../components/ProjectGridTile';
// import { SafeAreaView } from 'react-navigation';

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

class ProjectListScreen extends React.Component {
  // static navigationOptions = ({ navigation, screenProps }) => ({
  //   title: navigation.state.params.name + "'s Profile!",
  //   headerRight: <Button color={screenProps.tintColor} />,

  // });
  // static navigationOptions = ({ navigation, navigationOptions }) => {
  //   const { params } = navigation.state;
  //   return {
  //     title: params ? params.name : "Project",
  //     /* These values are used instead of the shared configuration! */
  //     headerStyle: {
  //       backgroundColor: "Red",
  //     },
  //     // headerTintColor: navigationOptions.headerStyle.backgroundColor,
  //   };
  // };

  constructor(props) {
    super();
    this.categoryTitle = props.navigation.getParam("title");
    this.state = {
      projectList: [],
      activeSlide: 0,
      isOpened: [],
    };
  }

  componentDidMount() {
    let items = [];
    // var data = dummyData.data;
    var isOpened = [];
    for (let i = 0; i < dummyData.length; i++) {
      isOpened.push(false);
    }
    // this.setState({ isOpened: isOpened, projectList: data });
    firebase
      .firestore()
      .collection("Projects")
      .where("category", "==", this.categoryTitle)
      .get()
      .then((e) => {
        e.forEach((doc) => {
          items.push(doc.data());
          this.setState({
            projectList: items,
            isOpened: isOpened,
          });
          //   this.forceUpdate();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
        ) : null}
      </Gradient.diagonalGradient>
    );
  }

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
        <Image source={{ uri: project.iconUrl }} style={styles.projectIcon} />
        <View>
          <Text style={styles.ProjectTitle}>{project.title}</Text>
          <Text style={{ fontSize: 14, color: "white", alignSelf: "center" }}>
            ({project.address})
          </Text>
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
            {this.imageSlidingView(project.imageArray)}
            <Text style={styles.text}>{project.description}</Text>
            {this.imageSlidingView(project.imageArray)}
          </View>
        ) : null}
      </View>
    );
  };

  imageSlidingView = (arr) => {
    return (
      <View style={[styles.screen, { paddingTop: "8%" }]}>
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
            itemWidth={width / 2}
            data={arr}
            renderItem={({ item }) => {
              return (
                <Image source={{ uri: item }} style={styles.carouselImage} />
              );
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
  };
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 17,
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
  },

  carouselImage: {
    height: height / 5,
    width: width / 2,
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
