import React, { Component, Fragment } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  ActivityIndicator,
} from "react-native";
import { Button, Overlay } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { HideWithKeyboard } from "react-native-hide-with-keyboard";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import ErrorMessage from "../components/ErrorMessage";
import AppLogo from "../components/AppLogo";
import { withFirebaseHOC } from "../config/Firebase";
import Signup from "./Signup";
import { Left } from "native-base";
import Gradient from "../components/Gradient";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email")
    .test("email", "Please enter a valid IITD email", (str) => {
      if (str && str.length > 10 && str.substr(-10) == "iitd.ac.in") {
        return true;
      }
    }),
  password: Yup.string()
    .label("Password")
    .required()
    .min(6, "Password must have at least 6 characters "),
});

class Login extends Component {
  static navigationOptions = ({ navigation }) => {
    //return header with Custom View which will replace the original header
    return {
      header: (
        <View
          style={{
            height: 45,
            marginTop: 20,
            backgroundColor: "red",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            This is Custom Header
          </Text>
        </View>
      ),
    };
  };

  state = {
    passwordVisibility: true,
    rightIcon: "ios-eye",
    login: true,
    pressedLogin: false,
  };

  comeBackAfterSignUp = () => {
    this.setState({ login: true });
  };

  goToSignup = () => this.props.navigation.navigate("Signup");

  goToForgotPassword = () => this.props.navigation.navigate("ForgotPassword");

  handlePasswordVisibility = () => {
    this.setState((prevState) => ({
      rightIcon: prevState.rightIcon === "ios-eye" ? "ios-eye-off" : "ios-eye",
      passwordVisibility: !prevState.passwordVisibility,
    }));
  };

  handleOnLogin = async (values, actions) => {
    this.setState({ pressedLogin: true });
    const { email, password } = values;
    try {
      const response = await this.props.firebase.loginWithEmail(
        email,
        password
      );
      if (!this.props.firebase.isUserVerified()) {
        actions.setFieldError("general", "User not Verified");
      }
      if (response.user && this.props.firebase.isUserVerified()) {
        this.props.navigation.navigate("App");
      }
    } catch (error) {
      actions.setFieldError("general", error.message);
    } finally {
      this.setState({ pressedLogin: false });
      actions.setSubmitting(false);
    }
  };

  render() {
    const { passwordVisibility, rightIcon } = this.state;
    return (
      <Gradient.diagonalGradient>
        <Overlay
          isVisible={this.state.pressedLogin}
          fullScreen={true}
          overlayStyle={{
            backgroundColor: "transparent",
            opacity: 0.9,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={50} color="white" />
        </Overlay>
        <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
          {this.state.login ? (
            <Image
              // source={require("../assets/IconWithBgColor.png")}
              source={require("../assets/NSSlogoPng.png")}
              resizeMode="contain"
              style={styles.logo}
            />
          ) : null}

          {/* <HideWithKeyboard style={styles.logoContainer}>
            <AppLogo />
          </HideWithKeyboard> */}
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "white",
              paddingTop: this.state.login ? "20%" : "5%",
              padding: "4%",
              marginTop: this.state.login ? "30.5%" : "10%",
            }}
          >
            {this.signUpLogInTab()}

            {this.state.login == true ? (
              <View style={{ flex: 1 }}>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  onSubmit={(values, actions) => {
                    this.handleOnLogin(values, actions);
                  }}
                  validationSchema={validationSchema}
                >
                  {({
                    handleChange,
                    values,
                    handleSubmit,
                    errors,
                    isValid,
                    touched,
                    handleBlur,
                    isSubmitting,
                  }) => (
                    <Fragment>
                      <FormInput
                        name="E-mail"
                        value={values.email}
                        onChangeText={handleChange("email")}
                        placeholder="Enter email"
                        autoCapitalize="none"
                        iconName="ios-mail"
                        iconColor="#2C384A"
                        onBlur={handleBlur("email")}
                      />
                      <ErrorMessage
                        errorValue={touched.email && errors.email}
                      />
                      <FormInput
                        name="Password"
                        value={values.password}
                        onChangeText={handleChange("password")}
                        placeholder="Enter password"
                        secureTextEntry={passwordVisibility}
                        iconName="ios-lock"
                        iconColor="#2C384A"
                        onBlur={handleBlur("password")}
                        rightIcon={
                          <TouchableOpacity
                            onPress={this.handlePasswordVisibility}
                          >
                            <Ionicons name={rightIcon} size={28} color="grey" />
                          </TouchableOpacity>
                        }
                      />
                      <ErrorMessage
                        errorValue={touched.password && errors.password}
                      />
                      <View style={styles.buttonContainer}>
                        <FormButton
                          buttonType="outline"
                          onPress={handleSubmit}
                          title="LOG IN"
                          // buttonColor="#039BE5"
                          buttonColor="#7256B1"
                          disabled={!isValid || isSubmitting}
                          loading={isSubmitting}
                        />
                      </View>
                      <ErrorMessage errorValue={errors.general} />
                    </Fragment>
                  )}
                </Formik>
                {/* <Button
                title="Don't have an account? Sign Up"
                onPress={this.goToSignup}
                titleStyle={{
                  color: "#F57C00",
                }}
                type="clear"
              /> */}
                <Button
                  title="Forgot Password ?"
                  onPress={this.goToForgotPassword}
                  titleStyle={{
                    // color: "#F57C00",
                    color: "white",
                  }}
                  style={{}}
                  type="clear"
                />
              </View>
            ) : (
              <Signup onPress={this.comeBackAfterSignUp}></Signup>
            )}
          </View>
        </ScrollView>
      </Gradient.diagonalGradient>
    );
  }

  signUpLogInTab = () => {
    return (
      <View
        style={{
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
          marginBottom: this.state.login ? "8%" : "3%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.setState({ login: true });
          }}
          style={[
            styles.tabButton,
            {
              borderBottomWidth: this.state.login ? 1 : 0,
              backgroundColor: this.state.login
                ? "rgba(0,0,0,0.08)"
                : "transparent",
            },
          ]}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              opacity: !this.state.login ? 0.6 : 1,
            }}
          >
            Log In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.setState({ login: false });
          }}
          style={[
            styles.tabButton,
            {
              borderBottomWidth: this.state.login ? 0 : 1,
              backgroundColor: this.state.login
                ? "transparent"
                : "rgba(0,0,0,0.08)",
            },
          ]}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              opacity: this.state.login ? 0.6 : 1,
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const bgcolor = "#426885";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
  },
  logo: {
    width: "40%",
    height: "25%",
    alignSelf: "center",
    position: "absolute",
    top: "5%",
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  buttonContainer: {
    margin: 10,
  },

  tabButton: {
    padding: "5%",
    paddingHorizontal: "10%",
    borderBottomColor: "white",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});

export default withFirebaseHOC(Login);
