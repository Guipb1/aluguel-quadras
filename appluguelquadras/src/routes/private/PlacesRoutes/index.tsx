import React from "react";

import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";

import { RouteNames } from "../../../constants/routeNames";

import { PlaceStackParamList } from "../../types";
import Places from "../../../screens/Places";
import NewPlace from "../../../screens/NewPlace";
import { Colors } from "../../../constants/colors";

const Stack = createStackNavigator<PlaceStackParamList>();

const PlacesRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName={RouteNames.PRIVATE.PLACES.ROOT}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={RouteNames.PRIVATE.PLACES.ROOT} component={Places} />
      <Stack.Screen
        name={RouteNames.PRIVATE.PLACES.NEW_PLACE}
        component={NewPlace}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};

export default PlacesRoutes;
