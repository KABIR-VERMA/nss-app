import React from "react";
import { Text} from "react-native";
import { withFirebaseHOC } from "../config/Firebase";


function Gallery(){
    return(
        <Text>Gallery</Text>
    );
}
export default withFirebaseHOC(Gallery);