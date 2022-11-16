import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const stylesDark = StyleSheet.create({
  itemContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: Colors.DARK,
    marginHorizontal: 5,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendComprovatText: {
    fontSize: 24,
    marginBottom: 20,
    color: Colors.PAPER,
  },
});

export default stylesDark;
