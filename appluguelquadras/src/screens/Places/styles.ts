import { StyleSheet } from "react-native";

import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },

  content: {
    flex: 1,
  },

  list: {
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  listHeader: {
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: Colors.BACKGROUND,
  },
  listHeaderTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.TEXT_PRIMARY,
  },
  itemSeparator: {
    height: 8,
  },

  newPlaceButton: {
    position: "absolute",
    bottom: 100,
    right: 24,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
    backgroundColor: Colors.PRIMARY,
  },
  newPlaceText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
