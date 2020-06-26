import React, { Component, Fragment } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Button } from "react-native-elements";
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
  state = {
    passwordVisibility: true,
    rightIcon: "ios-eye",
    login: true,
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
    const { email, password } = values;
    try {
      const response = await this.props.firebase.loginWithEmail(
        email,
        password
      );

      if (response.user && this.props.firebase.isUserVerified()) {
        this.props.navigation.navigate("App");
      }
    } catch (error) {
      actions.setFieldError("general", error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  render() {
    const { passwordVisibility, rightIcon } = this.state;
    if (this.state.login == true) {
      return (
        <ScrollView style={styles.container}>
          <Image
            source={require("../assets/IconWithBgColor.png")}
            resizeMode="contain"
            style={styles.logo}
          />

          {/* <HideWithKeyboard style={styles.logoContainer}>
            <AppLogo />
          </HideWithKeyboard> */}
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "white",
              paddingTop: "30%",
              padding: "4%",
              marginTop: "24.6%",
            }}
          >
            {this.state.login == true ? (
              <View style={{ flex: 1 }}>
                <Button
                  title="Hello"
                  onPress={() => {
                    this.setState({ login: false });
                  }}
                ></Button>
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
                          title="LOGIN"
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
                <Button
                  title="Don't have an account? Sign Up"
                  onPress={this.goToSignup}
                  titleStyle={{
                    color: "#F57C00",
                  }}
                  type="clear"
                />
                <Button
                  title="Forgot Password"
                  onPress={this.goToForgotPassword}
                  titleStyle={{
                    color: "#F57C00",
                  }}
                  type="clear"
                />
              </View>
            ) : (
              <Signup></Signup>
            )}
          </View>
        </ScrollView>
      );
    } else {
      return <Signup></Signup>;
    }
  }
}

const bgcolor = "#426885";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    backgroundColor: bgcolor,
    padding: "5%",
  },
  logo: {
    width: "40%",
    height: "25%",
    alignSelf: "center",
    position: "absolute",
    top: "1%",
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  buttonContainer: {
    margin: 25,
  },
});

export default withFirebaseHOC(Login);