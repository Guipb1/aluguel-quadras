import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { RouteNames } from "../../../constants/routeNames";

import { ChartStackParamList } from "../../types";
import Chart from "../../../screens/Chart";

const Stack = createStackNavigator<ChartStackParamList>();

const ChartRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName={RouteNames.PRIVATE.CHART.ROOT}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={RouteNames.PRIVATE.CHART.ROOT} component={Chart} />
    </Stack.Navigator>
  );
};

export default ChartRoutes;
