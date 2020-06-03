import React from "react";
import { Text} from "react-native";
import { withFirebaseHOC } from "../config/Firebase";


function Team(){
    return(
        <Text>Team</Text>
    );
}
export default withFirebaseHOC(Team);