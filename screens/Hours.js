import React from "react";
import { Text} from "react-native";
import { withFirebaseHOC } from "../config/Firebase";


function Hours(){
    return(
        <Text>Hours</Text>
    );
}
export default withFirebaseHOC(Hours);