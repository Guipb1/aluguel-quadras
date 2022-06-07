import type { CompositeScreenProps, RouteProp } from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { RouteNames } from "../constants/routeNames";

export type RootStackParamList = {
  [RouteNames.PUBLIC.ROOT]: undefined;
  [RouteNames.PRIVATE.ROOT]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type PublicStackParamList = {
  [RouteNames.PUBLIC.LOGIN]: undefined;
  [RouteNames.PUBLIC.NEW_ACCOUNT_TYPE]: undefined;
  [RouteNames.PUBLIC.NEW_ACCOUNT_BASIC]: undefined;
  [RouteNames.PUBLIC.NEW_ACCOUNT_LOCATOR]: undefined;
};

export type PlaceStackParamList = {
  [RouteNames.PRIVATE.PLACES.ROOT]: undefined;
  [RouteNames.PRIVATE.PLACES.NEW_PLACE]: undefined;
};

export type PlaceStackScreenProps<T extends keyof PlaceStackParamList> =
  StackScreenProps<PlaceStackParamList, T>;

export type PublicStackScreenProps<T extends keyof PublicStackParamList> =
  StackScreenProps<PublicStackParamList, T>;

export type PrivateTabsParamList = {
  [RouteNames.PRIVATE.HOME.ROOT]: undefined;
  [RouteNames.PRIVATE.PLACES.ROOT]: undefined;
};

export type PrivateTabsRouteProp = RouteProp<PrivateTabsParamList>;

export type PrivateTabsScreenProps<T extends keyof PrivateTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<PrivateTabsParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends RootStackParamList,
        PublicStackParamList,
        PrivateTabsParamList,
        PlaceStackParamList {}
  }
}
