import React, { Component } from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as Icon from "@expo/vector-icons";
import { withFirebaseHOC } from "../config/Firebase";
import firebase from "firebase";
import Fire from "../config/Firebase/firebase";

class Initial extends Component {
  state = {
    isAssetsLoadingComplete: false,
  };

  componentDidMount = async () => {
    try {
      // previously
      this.loadLocalAsync();

      await this.props.firebase.checkUserAuth(async (user) => {
        if (user && this.props.firebase.isUserVerified()) {
          // if the user has previously logged in
          global.isAdmin = await Fire.isAdmin();
          this.props.navigation.navigate("App");
        } else {
          // if the user has previously signed out from the app
          this.props.navigation.navigate("Auth");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadLocalAsync = async () => {
    return await Promise.all([
      Asset.loadAsync([
        require("../assets/splash.png"),
        require("../assets/nss.jpg"),
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
      }),
    ]);
  };

  handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isAssetsLoadingComplete: true });
  };

  render() {
    return (
      <AppLoading
        startAsync={this.loadLocalAsync}
        onFinish={this.handleFinishLoading}
        onError={this.handleLoadingError}
      />
    );
  }
}

export default withFirebaseHOC(Initial);
