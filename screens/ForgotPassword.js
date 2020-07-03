import React from "react";
import { Text, SafeAreaView, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import ErrorMessage from "../components/ErrorMessage";
import { withFirebaseHOC } from "../config/Firebase";
import Gradient from "../components/Gradient";
import { LinearGradient } from "expo-linear-gradient";

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
});

function ForgotPassword({ navigation, firebase }) {
  async function handlePasswordReset(values, actions) {
    const { email } = values;

    try {
      await firebase.passwordReset(email);
      console.log("Password reset email sent successfully");
      navigation.navigate("Login");
    } catch (error) {
      actions.setFieldError("general", error.message);
    }
  }

  return (
    <LinearGradient colors={Gradient.bgGradient} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Forgot Password?</Text>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={(values, actions) => {
            handlePasswordReset(values, actions);
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
            <>
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
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType="outline"
                  onPress={handleSubmit}
                  title="Send Email"
                  buttonColor="#039BE5"
                  disabled={!isValid || isSubmitting}
                />
              </View>
              <ErrorMessage errorValue={errors.general} />
            </>
          )}
        </Formik>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "10%",
    marginVertical: "30%",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    padding: "5%",
  },
  text: {
    marginTop: "50%",
    textAlign: "center",
    color: "white",
    fontSize: 24,
    marginBottom: "20%",
  },
  buttonContainer: {
    margin: 20,
    marginHorizontal: 35,
  },
});

export default withFirebaseHOC(ForgotPassword);
