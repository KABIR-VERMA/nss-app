import React from "react";
import { Text} from "react-native";
import { withFirebaseHOC } from "../config/Firebase";


function AboutUs(){
    return(
        <Text>About Us</Text>
    );
}
export default withFirebaseHOC(AboutUs);