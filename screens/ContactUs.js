import React from "react";
import { Text} from "react-native";
import { withFirebaseHOC } from "../config/Firebase";


function Contact(){
    return(
        <Text>Contact Us</Text>
    );
}
export default withFirebaseHOC(Contact);