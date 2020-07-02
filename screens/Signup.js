import React, { Component, Fragment } from "react";
import { StyleSheet, SafeAreaView,ActivityIndicator, View, TouchableOpacity } from "react-native";
import { Button, CheckBox, Overlay } from "react-native-elements";
import {} from 'react-native-gesture-handler'
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import ErrorMessage from "../components/ErrorMessage";
import { withFirebaseHOC } from "../config/Firebase";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label("Name")
    .required()
    .min(2, "Must have at least 2 characters"),
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
    .min(6, "Password should be at least 6 characters "),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Confirm Password must matched Password")
    .required("Confirm Password is required"),
  check: Yup.boolean().oneOf([true], "Please check the agreement"),
});

class Signup extends Component {
  state = {
    passwordVisibility: true,
    confirmPasswordVisibility: true,
    passwordIcon: "ios-eye",
    confirmPasswordIcon: "ios-eye",
    overlay: false,
  };

  goToLogin = () => this.props.navigation.navigate("Login");

  handlePasswordVisibility = () => {
    this.setState((prevState) => ({
      passwordIcon:
        prevState.passwordIcon === "ios-eye" ? "ios-eye-off" : "ios-eye",
      passwordVisibility: !prevState.passwordVisibility,
    }));
  };

  handleConfirmPasswordVisibility = () => {
    this.setState((prevState) => ({
      confirmPasswordIcon:
        prevState.confirmPasswordIcon === "ios-eye" ? "ios-eye-off" : "ios-eye",
      confirmPasswordVisibility: !prevState.confirmPasswordVisibility,
    }));
  };

  handleOnSignup = async (values, actions) => {
    console.log("Clicked SignUp")
    const { name, email, password } = values;
    this.setState({ overlay: true });
    try {
      const response = await this.props.firebase.signupWithEmail(
        email,
        password
      );

      if (response.user.uid) {
        const { uid } = response.user;
        const isAdmin = false;
        const userData = { email, name, uid, isAdmin };
        await this.props.firebase.createNewUser(userData);
        await this.props.firebase.verifyEmail();
        // console.log(this.props.firebase.isUserVerified());
        console.log("User created and email verification sent!");
        // this.props.firebase.signOut();
        // TODO
        // Add a new screeen showing - A verification email has been sent, Please verify then login
        alert("A verification email has been sent, Please verify then login");
        this.props.navigation.navigate("Initial");
      }
    } catch (error) {
      // console.error(error)
      actions.setFieldError("general", error.message);
    } finally {
      this.setState({ overlay: false });
      actions.setSubmitting(false);
    }
  };

  render() {
    const {
      passwordVisibility,
      confirmPasswordVisibility,
      passwordIcon,
      confirmPasswordIcon,
    } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Overlay
          isVisible={this.state.overlay}
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
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            check: false,
          }}
          onSubmit={(values, actions) => {
            console.log("Singing Up")
            this.handleOnSignup(values, actions);
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
            setFieldValue,
          }) => (
            <Fragment>
              <FormInput
                name="Name"
                value={values.name}
                onChangeText={handleChange("name")}
                placeholder="Enter your full name"
                iconName="md-person"
                iconColor="#2C384A"
                onBlur={handleBlur("name")}
              />
              <ErrorMessage errorValue={touched.name && errors.name} />
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
              <ErrorMessage errorValue={touched.email && errors.email} />
              <FormInput
                name="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                placeholder="Enter password"
                iconName="ios-lock"
                iconColor="#2C384A"
                onBlur={handleBlur("password")}
                secureTextEntry={passwordVisibility}
                rightIcon={
                  <TouchableOpacity onPress={this.handlePasswordVisibility}>
                    <Ionicons name={passwordIcon} size={28} color="grey" />
                  </TouchableOpacity>
                }
              />
              <ErrorMessage errorValue={touched.password && errors.password} />
              <FormInput
                name="Confirm Password"
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                placeholder="Confirm password"
                iconName="ios-lock"
                iconColor="#2C384A"
                onBlur={handleBlur("confirmPassword")}
                secureTextEntry={confirmPasswordVisibility}
                rightIcon={
                  <TouchableOpacity
                    onPress={this.handleConfirmPasswordVisibility}
                  >
                    <Ionicons
                      name={confirmPasswordIcon}
                      size={28}
                      color="grey"
                    />
                  </TouchableOpacity>
                }
              />
              <ErrorMessage
                errorValue={touched.confirmPassword && errors.confirmPassword}
              />
              {/* <CheckBox
                containerStyle={styles.checkBoxContainer}
                checkedIcon="check-box"
                iconType="material"
                uncheckedIcon="check-box-outline-blank"
                title="Agree to terms and conditions"
                textStyle={{ color: "white" }}
                checkedColor="white"
                checkedTitle="You agreed to our terms and conditions"
                checked={values.check}
                onPress={() => setFieldValue("check", !values.check)}
              /> */}
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType="outline"
                  onPress={handleSubmit}
                  title="SIGN UP"
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
          title="Have an account? Login"
          onPress={this.goToLogin}
          titleStyle={{
            color: "#039BE5",
          }}
          type="clear"
        /> */}
      </SafeAreaView>
    );
  }
}

const bgcolor = "#426885";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: "3%",
  },
  checkBoxContainer: {
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
});

export default withFirebaseHOC(Signup);
