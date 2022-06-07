import React from "react";

import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";

import Login from "../../screens/Login";
import NewAccountType from "../../screens/NewAccountType";
import NewAccountBasic from "../../screens/NewAccountBasic";
import NewAccountLocator from "../../screens/NewAccountLocator";
import { RouteNames } from "../../constants/routeNames";

import { PublicStackParamList } from "../types";

const Stack = createStackNavigator<PublicStackParamList>();

const PublicRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName={RouteNames.PUBLIC.LOGIN}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={RouteNames.PUBLIC.LOGIN} component={Login} />
      <Stack.Screen
        name={RouteNames.PUBLIC.NEW_ACCOUNT_TYPE}
        component={NewAccountType}
      />
      <Stack.Screen
        name={RouteNames.PUBLIC.NEW_ACCOUNT_BASIC}
        component={NewAccountBasic}
      />
      <Stack.Screen
        name={RouteNames.PUBLIC.NEW_ACCOUNT_LOCATOR}
        component={NewAccountLocator}
      />
    </Stack.Navigator>
  );
};

export default PublicRoutes;
