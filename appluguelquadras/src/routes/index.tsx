import React, { useEffect, useMemo, useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { RouteNames } from "../constants/routeNames";

import PublicRoutes from "./public";
import PrivateRoutes from "./private";

import { RootStackParamList } from "./types";
import useAuthContext from "../hooks/useAuthContext";

const Stack = createStackNavigator<RootStackParamList>();

const RootRoutes = () => {
  const { initializing, hasUser } = useAuthContext();

  const options = useMemo(() => {
    const isLogged = !initializing && hasUser;

    return {
      routename: isLogged ? RouteNames.PRIVATE.ROOT : RouteNames.PUBLIC.ROOT,
      component: isLogged ? (
        <Stack.Screen
          name={RouteNames.PRIVATE.ROOT}
          component={PrivateRoutes}
        />
      ) : (
        <Stack.Screen name={RouteNames.PUBLIC.ROOT} component={PublicRoutes} />
      ),
    };
  }, [initializing, hasUser]);

  return (
    <Stack.Navigator
      initialRouteName={options.routename}
      screenOptions={{ headerShown: false }}
    >
      {options.component}
    </Stack.Navigator>
  );
};

export default RootRoutes;
