import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { RouteNames } from "../../../constants/routeNames";

import { HomeStackParamList } from "../../types";
import Home from "../../../screens/Home";
import ProfileInfos from "../../../screens/ProfileInfos";
import SendComprovant from "../../../screens/SendComprovant";
import Pay from "../../../screens/PayScreen";

const Stack = createStackNavigator<HomeStackParamList>();

const HomeRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName={RouteNames.PRIVATE.HOME.ROOT}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={RouteNames.PRIVATE.HOME.ROOT} component={Home} />
      <Stack.Screen
        name={RouteNames.PRIVATE.HOME.PROFILE_INFOS}
        component={ProfileInfos}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name={RouteNames.PRIVATE.HOME.SEND_COMPROVANT}
        component={SendComprovant}
        // options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name={RouteNames.PRIVATE.HOME.PAY}
        component={Pay}
        // options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};

export default HomeRoutes;
