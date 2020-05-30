import React from "react";
import { Text} from "react-native";
import { withFirebaseHOC } from "../config/Firebase";


function About(){
    return(
        <Text>About Us</Text>
    );
}
export default withFirebaseHOC(About);