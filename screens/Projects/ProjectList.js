import React, { useState, Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableScale,
  LinearGradient,
} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import DropDownItem from "react-native-drop-down-item";
import Expo from "expo";
import { Ionicons } from "@expo/vector-icons";

import firebase from "firebase";
import { withFirebaseHOC } from "../../config/Firebase";
import Gradient from "../../components/Gradient";

import dummyData from "./dummyData.json";

// import { render } from "react-dom";
// import { render } from 'react-dom';

// import { PROJECTLIST } from "../../data/dummy-data";
// import ProjectCategoryGridTile from '../../components/ProjectGridTile';
// import { SafeAreaView } from 'react-navigation';

class ProjectListScreen extends React.Component {
  //    constructor(props){
  //     let categoryTitle = props.navigation.getParam('title');
  //    }
  // const [projectList,setList]=useState([])

  // categoryTitle = props.navigation.getParam('title');

  //  firebase.firestore().collection('Projects').where('category','==',categoryTitle).get().then((e)=>{
  //     let items=[]

  //     e.forEach((doc)=>{
  //         // console.log(typeof(doc.data()));
  //         let ele={};
  //         ele=doc.data()
  //         items.push(ele);

  //         // projectList.push(ele);
  //     })
  //     setList(items);
  //     setList([...projectList,setList]);
  // });
  // console.log(projectList);

  constructor(props) {
    super();
    this.categoryTitle = props.navigation.getParam("title");
    this.state = {
      projectList: [],
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.name + "'s Profile!",
    headerRight: <Button color={screenProps.tintColor} />,
  });

  static navigationOptions = {
    title: "Great",
  };

  componentDidMount() {
    let items = [];
    // firebase
    //   .firestore()
    //   .collection("Projects")
    //   .where("category", "==", this.categoryTitle)
    //   .get()
    //   .then((e) => {
    //     // console.log(typeOf(items));
    //     e.forEach((doc) => {
    //       // console.log(doc.data());
    //       items.push(doc.data());
    //       //  console.log('-----------',items);
    //       this.setState({
    //         projectList: items,
    //       });
    //       //   this.forceUpdate();
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // console.log("--", this.state.projectList);
  }

  render() {
    let categoryTitle = this.props.navigation.getParam("title");
    // console.log(this.state.projectList);
    return (
      <Gradient.diagonalGradient>
        <SafeAreaView style={styles.container}>
          {/* <View style={styles.heading}>
              <Text style={styles.headingText}>{categoryTitle}</Text>
            </View> */}
          <FlatList
            // data={this.state.projectList}
            data={dummyData.data}
            renderItem={(itemdata) => this.renderFlatListItem(itemdata)}
            keyExtractor={(item) => item.index}
          />
        </SafeAreaView>
      </Gradient.diagonalGradient>
    );
  }

  renderFlatListItem = (itemdata) => {
    var project = itemdata.item;

    return (
      <DropDownItem
        key={itemdata.index}
        // style={styles.dropDownItem}
        contentVisible={false}
        // invisibleImage={IC_ARR_DOWN}
        // visibleImage={require('../../assets/avatar.png')}
        header={
          <View
            style={[
              styles.screen,
              {
                flexDirection: "row",
                padding: "2%",
                paddingBottom: "10%",
                borderTopWidth: itemdata.index == 0 ? 1 : 0,
                borderBottomWidth: 1,
                borderColor: "white",
              },
            ]}
          >
            <View>
              <Text
                style={{ fontSize: 20, color: "white", alignSelf: "center" }}
              >
                {project.item.title}
              </Text>
              <Text
                style={{ fontSize: 20, color: "white", alignSelf: "center" }}
              >
                ({project.item.address})
              </Text>
            </View>
            <Ionicons
              name="ios-arrow-down"
              size={24}
              color="white"
              style={{
                position: "absolute",
                right: "3%",
                // alignSelf: "flex-end",
              }}
            />
          </View>
        }
      >
        <Text
          style={[
            // styles.txt,
            {
              fontSize: 20,
            },
          ]}
        >
          {/* {param.body} */}
        </Text>
      </DropDownItem>
    );
  };

  flatListItem = (itemdata) => {
    return (
      <View>
        <ListItem
          style={styles.listItem}
          Component={TouchableScale}
          onPress={() => {
            console.log("we pressed");
            this.props.navigation.navigate("ProjectDetail", {
              project: itemdata.item,
            });
          }}
          friction={90} //
          tension={100} // These props are passed to the parent component (here TouchableScale)
          activeScale={0.95} //
          linearGradientProps={{
            colors: ["#FF9800", "#F44336"],
            start: { x: 1, y: 0 },
            end: { x: 0.2, y: 0 },
          }}
          ViewComponent={LinearGradient} // Only if no expo
          leftAvatar={{
            rounded: true,
            source: { uri: itemdata.item.iconUrl },
          }}
          title={itemdata.item.title}
          titleStyle={{ color: "white", fontWeight: "bold" }}
          subtitleStyle={{ color: "white" }}
          subtitle={itemdata.item.address}
          chevron={{ color: "white" }}
        />
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

  headingText: {
    fontSize: 18,
    // fontFamily: 'Gill Sans',
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "blue",
  },

  listItem: {
    marginHorizontal: 5,
    justifyContent: "center",
    marginVertical: 1,
  },
});

export default withFirebaseHOC(ProjectListScreen);
