import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { faSearch, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { withFirebaseHOC } from "../config/Firebase";
import Gradient from "../components/Gradient";
import { ScrollView } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";
import { Ionicons } from "@expo/vector-icons";
import Carousel, { Pagination } from "react-native-snap-carousel";

const { width, height } = Dimensions.get("window");

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageuri: "",
      imagecaption: "",
      ModalVisibleStatus: false,
      loading: true,
      currentItemIndex: 0,
      dataSource: [],
    };
  }

  ShowModalFunction(visible, imageURL, imagecaption, index) {
    //handler to handle the click on image of Grid
    //and close button on modal
    this.setState({
      ModalVisibleStatus: visible,
      imageuri: imageURL,
      imagecaption: imagecaption,
      currentItemIndex: index,
    });
  }

  componentDidMount() {
    var that = this;
    const link =
      "https://nssgallery.herokuapp.com/galleries?_sort=createdAt:DESC";
    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        let items = data.map((item, index) => {
          var url =
            index % 12 == 0
              ? "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              : index % 12 == 1
              ? "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              : index % 12 == 2
              ? "https://images.unsplash.com/photo-1512353087810-25dfcd100962?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              : index % 12 == 3
              ? "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              : index % 12 == 4
              ? "https://images.unsplash.com/photo-1552642986-ccb41e7059e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              : index % 12 == 5
              ? "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              : index % 12 == 6
              ? "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              : index % 12 == 7
              ? "https://images.unsplash.com/photo-1492288991661-058aa541ff43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              : index % 12 == 8
              ? "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              : index % 12 == 9
              ? "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              : index % 12 == 10
              ? "https://images.unsplash.com/photo-1472417583565-62e7bdeda490?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              : index % 12 == 11
              ? "https://images.unsplash.com/photo-1515664069236-68a74c369d97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              : "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
              
          return {
            id: item._id,
            src: item.Images.url,
            // src: url,
            caption: item.caption,
          };
        });
        that.setState({
          dataSource: items,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Encountered Network Error!");
      });
  }

  renderSingleItem = ({ item, index }) => {
    return (
      <View
        key={item.id}
        style={{ flex: 1, flexDirection: "column", margin: 1 }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            this.ShowModalFunction(true, item.src, item.caption, index);
          }}
        >
          {/* <FastImage
            style={styles.image}
            source={{
              uri: item.src,
              // headers: { Authorization: "someAuthToken" },
              // priority: FastImage.priority.normal,
            }}
            // resizeMode={FastImage.resizeMode.stretch}
          /> */}
          <Image
            key={item.id}
            style={styles.image}
            source={{
              uri: item.src,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderGallery = () => {
    return (
      <View style={{ flex: 1 }}>
        {this.state.ModalVisibleStatus ? (
          <Modal
            transparent={false}
            animationType={"fade"}
            visible={this.state.ModalVisibleStatus}
            onRequestClose={() => {
              this.ShowModalFunction(!this.state.ModalVisibleStatus, "", "", 0);
            }}
          >
            <Gradient.diagonalGradient>
              <View style={styles.modelStyle}>{this.imageSlidingView()}</View>
            </Gradient.diagonalGradient>
          </Modal>
        ) : (
          <View style={styles.container}>
            <FlatList
              data={this.state.dataSource}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderSingleItem}
              //Setting the number of column
              numColumns={3}
              initialNumToRender={10}
              removeClippedSubviews={true} // Unmount components when outside of window
              maxToRenderPerBatch={20} // Reduce number in each render batch
              // maxToRenderPerBatch={100} // Increase time between renders
              // windowSize={7}
            />
          </View>
        )}
      </View>
    );
  };

  renderSingleImage = (item) => {
    return (
      <View
        key={item.id}
        style={{ height: "100%", ...styles.common }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 20,
            margin: "5%",
            position: "absolute",
            bottom: "75%",
          }}
        >
          {item.caption}
        </Text>
        <Image
          // style={styles.fullImageStyle}
          style={{ height: "50%", width: "100%", resizeMode: "contain" }}
          source={{ uri: item.src }}
          resizeMode="contain"
        />
        {/* <View
          style={{ height: "50%", width: "100%", backgroundColor: "white" }}
        ></View> */}
      </View>
    );
  };

  imageSlidingView = () => {
    if (this.state.dataSource.length == 0) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
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
            initialNumToRender={this.state.dataSource.length}
            // sliderHeight={height / 5}
            itemWidth={width / 1.3}
            data={this.state.dataSource}
            renderItem={({ item }) => {
              // return (<View><Text>HEllo</Text></View>)
              return this.renderSingleImage(item);
            }}
            // onBeforeSnapToItem={(index) =>
            //   this.setState({ activeSlide: index })
            // }
            loop={false}
            decelerationRate={1}
            firstItem={this.state.currentItemIndex}
            // hasParallaxImages={true}
          />
          <Ionicons
            name="md-arrow-dropright"
            size={30}
            color="white"
            style={{ padding: "2%" }}
          />
        </View>

        <FontAwesomeIcon
          icon={faWindowClose}
          size={50}
          color="white"
          onPress={() => {
            this.ShowModalFunction(!this.state.ModalVisibleStatus, "", "");
          }}
          style={{
            borderRadius: 25,
            marginBottom: 20,
            alignSelf: "center",
          }}
        />
      </View>
    );
  };

  render() {
    return (
      <Gradient.diagonalGradient>
        {this.state.loading ? (
          <ActivityIndicator
            style={styles.activityIndicatorWrapper}
            animating={true}
            size={50}
            color="white"
          />
        ) : (
          this.renderGallery()
        )}
      </Gradient.diagonalGradient>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    top: height * 0.4,
  },
  common: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  image: {
    height: 120,
    width: "100%",
  },
  fullImageStyle: {
    height: height * 0.9,
    width: width / 1.3,
    resizeMode: "contain",
  },
  modelStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  closeButtonStyle: {
    width: 25,
    height: 25,
    top: 9,
    right: 9,
    position: "absolute",
  },
  CloseModal: {
    top: 30,
  },
});

export default withFirebaseHOC(Gallery);
