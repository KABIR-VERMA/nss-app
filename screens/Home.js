import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
  Linking,
  ActivityIndicator,
  YellowBox,
  StatusBar,
} from "react-native";
import { Button, Overlay } from "react-native-elements";
import { withFirebaseHOC } from "../config/Firebase";
import { Table, TableWrapper, Row } from "react-native-table-component";
import Expo from "expo";
import { LinearGradient } from "expo-linear-gradient";
import Gradient from "../components/Gradient";
import firebase from "firebase";
import FormButton from "../components/FormButton";
import { FlatList } from "react-native-gesture-handler";
import _ from "lodash";

const bgcolor = "#426885";
// rgb(66, 104, 133)

const description =
  "NSS IIT Delhi is the IIT Delhi chapter of the National Service Scheme, institutionalized under the Ministry of Youth Affairs & Sports Govt. of India. Our sole aim is to motivate students at IITD to indulge in nation building activities through various events and projects which are aimed towards the benefit of people in and around IIT Delhi. We share the belief that such activities are almost always means of great satisfaction and joy.";

const tableHeader = ["S.no", "Name", "Date", "Status"];
var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;
// console.log(width);
const rowWidth = [width / 10, width / 2.5, width / 5.3, width / 5.3];

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Main",
    };
  };

  constructor(props) {
    super(props);
    if (global.isAdmin) {
      this.subs = [
        this.props.navigation.addListener("willFocus", () => {
          this.componentDidMount();
        }),
      ];
    }
  }

  state = {
    tableData: [],
    tableHeader: null,
    overlayItem: null,
    overlay: false,
    refreshing: true,
  };

  handleSignout = async () => {
    try {
      await this.props.firebase.signOut();
      this.props.navigation.navigate("Auth");
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = () => {
    StatusBar.setBarStyle("light-content", true);
    StatusBar.setBackgroundColor("#404c59");
    var tableData = [];
    firebase
      .firestore()
      .collection("Events")
      .get()
      .then((e) => {
        var i = 1;
        e.forEach((doc) => {
          const rowData = [];
          //   console.log(doc.data());
          rowData.push(this.generateCell(i, 0));
          rowData.push(this.generateCell(doc.data().title, 1));
          rowData.push(this.generateCell(doc.data().date, 2));
          //----link is given for apply button----//
          rowData.push(
            this.generateCell(doc.data().link, 3, false, doc.data())
          );
          i++;
          //   tableData.push(doc.data());
          //   this.forceUpdate();
          tableData.push(rowData);
        });
        this.setState({ tableData, refreshing: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  generateCell = (text, column, head = false, item = null) => {
    if (column == 3) {
      return this.applyButton(item);
    }
    return (
      <View
        style={[
          styles.container,
          {
            borderColor: "white",
            borderWidth: 0.5,
            borderLeftWidth: column == 0 ? 0 : 0.5,
            borderTopWidth: head ? 0 : 0.5,
            borderRightWidth: column == -1 ? 0 : 0.5,
            minHeight: 35,
            padding: 1,
          },
        ]}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: head ? "bold" : "normal",
          }}
        >
          {text}
        </Text>
      </View>
    );
  };

  tableView = () => {
    const tabheader = [];
    tabheader.push(this.generateCell("S.no", 0, true));
    tabheader.push(this.generateCell("Name", 1, true));
    tabheader.push(this.generateCell("Date", 2, true));
    tabheader.push(this.generateCell("", -1, true));
    return (
      <View
        style={{
          width: "90%",
          height: global.isAdmin ? "40%" : "50%",
          marginTop: "5%",
        }}
      >
        <Table borderStyle={{ borderColor: "white" }}>
          <Row
            key={100000}
            data={tabheader}
            widthArr={rowWidth}
            style={{ minHeight: 35 }}
            textStyle={{ textAlign: "center", color: "white" }}
          />
        </Table>
        <View style={{ flex: 1 }}>
          {this.state.tableData.length > 0 ? (
            <FlatList
              data={this.state.tableData}
              keyExtractor={(item, ind) => ind.toString()}
              renderItem={({ item, index }) => {
                return (
                  <Row
                    key={index}
                    data={item}
                    widthArr={rowWidth}
                    // style={{ height: 35 }}
                    textStyle={{ textAlign: "center", color: "white" }}
                  />
                );
              }}
            />
          ) : (
            <ActivityIndicator
              style={{ marginTop: "15%" }}
              size={30}
              color="white"
            />
          )}
        </View>
        {/* <ScrollView style={{}}>
          <Table borderStyle={{ borderColor: "white" }}>
            {this.state.tableData.map((rowData, index) => (
              <Row
                key={index}
                data={rowData}
                widthArr={rowWidth}
                // style={{ height: 35 }}
                textStyle={{ textAlign: "center", color: "white" }}
              />
            ))}
          </Table>
        </ScrollView> */}
      </View>
    );
  };

  applyButton = (item) => {
    return (
      <View
        style={[
          styles.container,
          { borderColor: "white", borderWidth: 0.5, borderRightWidth: 0 },
        ]}
      >
        <TouchableOpacity
          onPress={() => this.handleApply(item)}
          style={styles.applyButton}
        >
          <LinearGradient
            colors={Gradient.buttonGradient}
            style={{ borderRadius: 10 }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Apply</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  handleApply = (item) => {
    this.setState({ overlayItem: item, overlay: true });
  };

  renderOverlay = () => {
    const item = this.state.overlayItem;
    // console.log("item", item);
    var aspectRat = 1;
    Image.getSize(item.imageUrl, (wid, hei) => {
      aspectRat = wid / hei;
    });
    return (
      <Overlay
        fullScreen
        overlayBackgroundColor="rgba(0,0,0,0.7)"
        isVisible={this.state.overlay}
        overlayStyle={{
          padding: "2%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LinearGradient
          colors={Gradient.bgGradient}
          style={{
            minHeight: "50%",
            borderRadius: 20,
            borderColor: "white",
            borderWidth: 1,
            padding: "5%",
            paddingBottom: "1%",
          }}
        >
          <ScrollView>
            <View style={{ alignItems: "flex-start" }}>
              {item.imageUrl != "" ? (
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{
                    width: "100%",
                    aspectRatio: aspectRat,
                    resizeMode: "contain",
                    alignSelf: "center",
                  }}
                />
              ) : null}
              <Text
                style={{ color: "white", fontSize: 25, textAlign: "center" }}
              >
                {item.title}
              </Text>
              <Text style={{ color: "white", fontSize: 16, marginTop: 20 }}>
                Event Date: {item.date}
              </Text>
              <Text style={{ color: "white", fontSize: 16, marginTop: 20 }}>
                {item.description}
              </Text>
            </View>
          </ScrollView>
          <View
            style={{
              marginTop: 10,
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ marginRight: "3%" }}>
              <FormButton
                title="Close"
                onPress={() => {
                  this.setState({ overlay: false, overlayItem: null });
                }}
              />
            </View>
            <FormButton
              title="Apply"
              onPress={() => {
                this.setState({ overlay: false, overlayItem: null });
                var isHttp =
                  item.link.substring(0, 4).localeCompare("http") == 0;
                Linking.openURL(isHttp ? item.link : "https://" + item.link);
              }}
            />
          </View>
          {global.isAdmin ? this.deleteEventButton(item) : null}
        </LinearGradient>
      </Overlay>
    );
  };

  deleteEventButton = (item) => {
    return (
      <View style={{ padding: 0, marginTop: "3%" }}>
        <FormButton
          title="Delete"
          onPress={() => {
            Alert.alert(
              "",
              "Are you sure you want to delete this event?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "Yes",
                  onPress: () => {
                    console.log("deleting", item.id);
                    firebase
                      .firestore()
                      .collection("Events")
                      .doc(item.id)
                      .delete()
                      .then(() => {
                        alert(
                          "Deleted Event " +
                            item.title +
                            " scheduled on " +
                            item.date
                        );
                        this.setState({ overlay: false, overlayItem: null });
                        this.componentDidMount();
                      });
                    // this.forceUpdate();
                  },
                },
              ],
              { cancelable: false }
            );

            /* Delete Event */
          }}
        />
      </View>
    );
  };

  addEventButton = () => {
    return (
      <View style={{}}>
        <FormButton
          title="Add Event"
          onPress={() => {
            console.log("navigate");
            try {
              this.props.navigation.navigate("AddEventScreen");
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </View>
    );
  };

  render() {
    return (
      <Gradient.diagonalGradient>
        {this.state.overlay ? this.renderOverlay() : null}
        <View style={styles.container}>
          <Image
            resizeMode="contain"
            // source={require("../assets/IconWithBgColor.png")}
            source={require("../assets/NSSlogoPng.png")}
            style={{ width: "20%", height: "15%" }}
          />
          <Text style={styles.header}>NSS, IIT Delhi</Text>
          <View style={styles.hr} />
          <Text style={styles.description}>{description}</Text>
          <View style={styles.hr} />
          {this.state.tableData ? this.tableView(this.state.tableData) : null}
          {global.isAdmin ? this.addEventButton() : null}
        </View>
      </Gradient.diagonalGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: "1%",
  },
  hr: {
    borderBottomWidth: 1,
    borderColor: "white",
    width: "95%",
  },
  header: {
    color: "white",
    marginTop: "0.1%",
    marginBottom: "2%",
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    color: "white",
    margin: "2%",
    fontSize: 13,
  },
  applyButton: {
    width: width / 6,
    height: "60%",
    borderRadius: 10,
    justifyContent: "center",
  },
});

export default withFirebaseHOC(Home);
