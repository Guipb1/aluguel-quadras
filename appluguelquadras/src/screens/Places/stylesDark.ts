import { StyleSheet } from "react-native";

import { Colors } from "../../constants/colors";

const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARK,
  },
  listHeader: {
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: Colors.DARK,
  },
  listHeaderTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.PAPER,
  },
});

export default stylesDark;
