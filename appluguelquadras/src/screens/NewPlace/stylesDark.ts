import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARK,
  },
  headerTitle: {
    color: Colors.PAPER,
    fontSize: 20,
    fontWeight: "bold",
  },
  addTimesTitle: {
    fontWeight: "bold",
    color: Colors.PAPER,
  },
});

export default stylesDark;
