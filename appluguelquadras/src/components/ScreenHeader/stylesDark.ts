import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const stylesDark = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 45,
    backgroundColor: Colors.DARK,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.PAPER,
  },
});

export default stylesDark;
