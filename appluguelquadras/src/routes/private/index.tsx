import React, { useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";

import Home from "../../screens/Home";
import { RouteNames } from "../../constants/routeNames";
import { Colors } from "../../constants/colors";

import { PrivateTabsParamList, PrivateTabsRouteProp } from "../types";

import PlacesRoutes from "./PlacesRoutes";

type HandleTabBarIconProps = {
  route: PrivateTabsRouteProp;
  focused: boolean;
  color: string;
  size: number;
};

const Tabs = createBottomTabNavigator<PrivateTabsParamList>();

const PrivateRoutes = () => {
  const handleTabBarIcon = ({
    route,
    color,
    focused,
  }: HandleTabBarIconProps) => {
    switch (route.name) {
      case RouteNames.PRIVATE.HOME.ROOT:
        return (
          <MaterialCommunityIcons
            name={focused ? "home" : "home-outline"}
            size={focused ? 38 : 34}
            color={color}
          />
        );
      case RouteNames.PRIVATE.PLACES.ROOT:
        return (
          <MaterialCommunityIcons
            name={focused ? "map-marker-radius" : "map-marker-radius-outline"}
            size={focused ? 38 : 34}
            color={color}
          />
        );

      default:
        return;
    }
  };

  return (
    <Tabs.Navigator
      initialRouteName={RouteNames.PRIVATE.HOME.ROOT}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.TEXT_SECONDARY,
        tabBarInactiveTintColor: Colors.BACKGROUND,
        tabBarItemStyle: {
          height: 60,
        },
        tabBarStyle: {
          display: "flex",
          padding: 0,
          position: "absolute",
          justifyContent: "center",
          height: 56,
          borderWidth: 1,
          borderTopWidth: 1,
          borderColor: Colors.PRIMARY,
          borderTopColor: Colors.PRIMARY,
          elevation: 0,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowRadius: 0,
          backgroundColor: Colors.PRIMARY,
        },

        tabBarIcon: (props) => handleTabBarIcon({ route, ...props }),
      })}
      sceneContainerStyle={{
        backgroundColor: Colors.BACKGROUND,
      }}
    >
      <Tabs.Screen name={RouteNames.PRIVATE.HOME.ROOT} component={Home} />
      <Tabs.Screen
        name={RouteNames.PRIVATE.PLACES.ROOT}
        component={PlacesRoutes}
      />
    </Tabs.Navigator>
  );
};

export default PrivateRoutes;
