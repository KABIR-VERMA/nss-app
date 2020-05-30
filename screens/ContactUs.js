import React from "react";
import { Text} from "react-native";
import { withFirebaseHOC } from "../config/Firebase";


function ContactUs(){
    return(
        <Text>Contact Us</Text>
    );
}
export default withFirebaseHOC(ContactUs);