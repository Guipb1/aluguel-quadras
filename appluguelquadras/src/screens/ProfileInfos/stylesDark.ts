import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARK,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.PAPER,
  },
});

export default stylesDark;
