import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProjectDetailScreen = (props) => {
  const project = props.navigation.getParam("project");
  console.log(project);

  return (
    <View style={styles.screen}>
      <Text>{project.title}</Text>
      <Text>{project.address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProjectDetailScreen;
