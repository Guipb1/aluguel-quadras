export const RouteNames = {
  PUBLIC: {
    ROOT: "PUBLIC",
    LOGIN: "LOGIN",
    NEW_ACCOUNT_TYPE: "NEW_ACCOUNT_TYPE",
    NEW_ACCOUNT_BASIC: "NEW_ACCOUNT_BASIC",
    NEW_ACCOUNT_LOCATOR: "NEW_ACCOUNT_LOCATOR",
  },
  PRIVATE: {
    ROOT: "PRIVATE",
    HOME: {
      ROOT: "HOME",
      PROFILE_INFOS: "PROFILE_INFOS",
      SEND_COMPROVANT: "SEND_COMPROVANT",
      PAY: "PAY",
    },
    BOOKINGS: {
      ROOT: "BOOKINGS",
    },
    PLACES: {
      ROOT: "PLACES",
      NEW_PLACE: "NEW_PLACE",
      PLACE_DETAILS: "PLACE_DETAILS",
    },
    CHART: {
      ROOT: "CHART",
    },
  },
} as const;
