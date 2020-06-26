import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Button, Overlay } from "react-native-elements";
import { withFirebaseHOC } from "../config/Firebase";
import { Table, TableWrapper, Row } from "react-native-table-component";
import { LinearGradient } from "expo-linear-gradient";
import Gradient from "../components/Gradient";
import firebase from "firebase";
import FormButton from "../components/FormButton";

const bgcolor = "#426885";
// rgb(66, 104, 133)

const description =
  "NSS IIT Delhi is the IIT Delhi chapter of the National Service Scheme, institutionalized under the Ministry of Youth Affairs & Sports Govt. of India. Our sole aim is to motivate students at IITD to indulge in nation building activities through various events and projects which are aimed towards the benefit of people in and around IIT Delhi. We share the belief that such activities are almost always means of great satisfaction and joy.";

const tableHeader = ["S.no", "Name", "Date", "Status"];
var width = Dimensions.get("window").width;
// console.log(width);
const rowWidth = [width / 10, width / 2.5, width / 5.3, width / 5.3];

class Home extends Component {
  state = {
    tableData: [],
    tableHeader: null,
    overlayItem: null,
    overlay: false,
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
    console.log("Home page");
    firebase
      .firestore()
      .collection("Events")
      .get()
      .then((e) => {
        var i = 1;
        e.forEach((doc) => {
          const rowData = [];
          // console.log(doc.data());
          console.log("Date", doc.data().Date);
          rowData.push(this.generateCell(i, 0));
          rowData.push(this.generateCell(doc.data().title, 1));
          rowData.push(this.generateCell(doc.data().date, 2));
          //----link is given for apply button----//
          rowData.push(
            this.generateCell(doc.data().link, 3, false, doc.data())
          );
          i++;
          // tableData.push(rowData);
          // this.forceUpdate();
          this.setState({ tableData: [...this.state.tableData, rowData] });
        });
      })
      .catch((error) => {
        console.log(error);
      });

    // this.setState({ tableData: tableData, tableHeader: header });

    // for (let i = 0; i < 30; i += 1) {
    //   const rowData = [];
    //   for (let j = 0; j < 4; j += 1) {
    //     if (j == 0) rowData.push(this.generateCell(i + 1, j));
    //     else rowData.push(this.generateCell("hello", j));
    //   }
    //   tableData.push(rowData);
    // }
    // console.log(tableData);
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

  tableView = (tableData) => {
    const tabheader = [];
    tabheader.push(this.generateCell("S.no", 0, true));
    tabheader.push(this.generateCell("Name", 1, true));
    tabheader.push(this.generateCell("Date", 2, true));
    tabheader.push(this.generateCell("Status", -1, true));
    return (
      <View style={{ width: "90%", height: "40%", marginTop: "5%" }}>
        <Table borderStyle={{ borderColor: "white" }}>
          <Row
            key={100000}
            data={tabheader}
            widthArr={rowWidth}
            style={{ minHeight: 35 }}
            textStyle={{ textAlign: "center", color: "white" }}
          />
        </Table>
        <ScrollView style={{}}>
          <Table borderStyle={{ borderColor: "white" }}>
            {tableData.map((rowData, index) => (
              <Row
                key={index}
                data={rowData}
                widthArr={rowWidth}
                // style={{ height: 35 }}
                textStyle={{ textAlign: "center", color: "white" }}
              />
            ))}
          </Table>
        </ScrollView>
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
    console.log("item", item);
    return (
      <Overlay
        fullScreen
        overlayBackgroundColor="rgba(0,0,0,0.7)"
        isVisible={this.state.overlay}
        overlayStyle={{
          padding: "10%",
          paddingBottom: "5%",
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
          }}
        >
          <ScrollView>
            <View style={styles.container}>
              <Text style={{ color: "white", fontSize: 25, textAlign: 'center' }}>{item.title}</Text>
              <Text style={{ marginTop: "4%", color: "white", fontSize: 20 }}>
                Event Date: {item.date}
              </Text>

              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
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
            <View style={{ marginRight: "10%" }}>
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
                Linking.openURL(item.link);
              }}
            />
          </View>
        </LinearGradient>
      </Overlay>
    );
  };

  addEventButton = () => {
    return (
      <View style={{}} >
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
          {this.addEventButton()}
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
