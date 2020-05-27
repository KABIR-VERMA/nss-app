import React from "react";
import { Image } from "react-native-elements";

const AppLogo = () => (
  <Image
    source={require("../assets/nss.jpg")}
    style={{ width: 200, height: 200 }}
  />
);

export default AppLogo;
