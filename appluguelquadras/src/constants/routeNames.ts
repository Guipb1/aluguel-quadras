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
    },
    BOOKINGS: {
      ROOT: "BOOKINGS",
    },
    PLACES: {
      ROOT: "PLACES",
      NEW_PLACE: "NEW_PLACE",
    },
  },
} as const;
