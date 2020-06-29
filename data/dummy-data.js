import React from "react";
import ProjectCategory from "../models/ProjectCategoryModel";
import ProjectDetail from "../models/ProjectDetail";
import {
  Entypo,
  FontAwesome5,
  Foundation,
  FontAwesome,
} from "@expo/vector-icons";
import { Dimensions, Image } from "react-native";

const width = Dimensions.get("window").width;

const props = {
  height: "30%",
  aspectRatio: 1,
};

const PROJECTCATEGORIES = [
  new ProjectCategory(
    "c1",
    "Education",
    "#f5428d",
    (
      <Image
        source={require("../assets/ProjectIcons/education.png")}
        style={props}
      />
    )
  ),
  new ProjectCategory(
    "c2",
    "Environment",
    "#f54242",
    (
      <Image
        source={require("../assets/ProjectIcons/environment.png")}
        style={props}
      />
    )
  ),
  new ProjectCategory(
    "c3",
    "Health",
    "#f5a442",
    (
      <Image
        source={require("../assets/ProjectIcons/health.png")}
        style={props}
      />
    )
  ),
  new ProjectCategory(
    "c4",
    "Internships",
    "#f5d142",
    (
      <Image
        source={require("../assets/ProjectIcons/internships.png")}
        style={props}
      />
    )
  ),
  new ProjectCategory(
    "c5",
    "Society",
    "#368dff",
    (
      <Image
        source={require("../assets/ProjectIcons/society.png")}
        style={props}
      />
    )
  ),
  new ProjectCategory(
    "c6",
    "Innovation",
    "#41d95d",
    (
      <Image
        source={require("../assets/ProjectIcons/innovation.png")}
        style={props}
      />
    )
  ),
  // new ProjectCategory("c8", "test", "#41d95d"),
  // new ProjectCategory('c7', 'Breakfast', '#9eecff'),
  // new ProjectCategory('c8', 'Asian', '#b9ffb0'),
  // new ProjectCategory('c9', 'French', '#ffc7ff'),
  // new ProjectCategory('c10', 'Summer', '#47fced'),
];

export default PROJECTCATEGORIES;
