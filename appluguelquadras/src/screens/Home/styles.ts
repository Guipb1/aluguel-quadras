import { StyleSheet } from "react-native";

import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF2F5",
    paddingTop: Constants.statusBarHeight + 8,
  },

  content: {
    flex: 1,
  },

  list: {
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  itemSeparator: {
    height: 8,
  },
});

export default styles;
