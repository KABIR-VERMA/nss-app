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
          return { id: item._id, src: item.Images.url, caption: item.caption };
        });
        that.setState({
          dataSource: items,
          loading: false,
        });
      })
      .catch(() => {
        alert("Encountered Network Error!");
      });
  }

  renderSingleItem = ({ item, index }) => {
    return (
      <View key={index} style={{ flex: 1, flexDirection: "column", margin: 1 }}>
        <TouchableOpacity
          key={item.id}
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
      <View key={item.id} style={{}}>
        <Text style={styles.caption}>{item.caption}</Text>
        <Image
          style={styles.fullImageStyle}
          source={{ uri: item.src }}
          resizeMode="contain"
        />
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
  caption: {
    color: "white",
    fontSize: 25,
    top: 70,
    textAlign: "center",
  },
  CloseModal: {
    top: 30,
  },
});

export default withFirebaseHOC(Gallery);
