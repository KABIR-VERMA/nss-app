import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Initial from "../screens/Initial";
import AuthNavigation from "./AuthNavigation";
import Drawer from "./Drawer"

import ProjectNavigation from "./ProjectNavigation";

const SwitchNavigator = createSwitchNavigator(
  {
    Initial: Initial,
    Auth: AuthNavigation,
    App: Drawer,
    ProjectNavigation: ProjectNavigation,

  },
  {
    initialRouteName: "Initial"
  }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;
