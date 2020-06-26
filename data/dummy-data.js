import React from "react";
import ProjectCategory from "../models/ProjectCategoryModel";
import ProjectDetail from "../models/ProjectDetail";
import {
  Entypo,
  FontAwesome5,
  Foundation,
  FontAwesome,
} from "@expo/vector-icons";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

const PROJECTCATEGORIES = [
  new ProjectCategory(
    "c1",
    "Education",
    "#f5428d",
    "https://cdn2.iconfinder.com/data/icons/book-22/210/1461-512.png"
  ),
  new ProjectCategory(
    "c2",
    "Environment",
    "#f54242",
    "https://cdn2.iconfinder.com/data/icons/book-22/210/1461-512.png"
  ),
  new ProjectCategory(
    "c3",
    "Health",
    "#f5a442",
    "https://cdn2.iconfinder.com/data/icons/book-22/210/1461-512.png"
  ),
  new ProjectCategory("c4", "Internships", "#f5d142"),
  new ProjectCategory("c5", "Society", "#368dff"),
  new ProjectCategory("c6", "Innovation", "#41d95d"),
  new ProjectCategory("c7", "Innovation", "#41d95d"),
  // new ProjectCategory('c7', 'Breakfast', '#9eecff'),
  // new ProjectCategory('c8', 'Asian', '#b9ffb0'),
  // new ProjectCategory('c9', 'French', '#ffc7ff'),
  // new ProjectCategory('c10', 'Summer', '#47fced'),
];

export default PROJECTCATEGORIES;
