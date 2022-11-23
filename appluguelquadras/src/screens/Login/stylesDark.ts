import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARK,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  registration: {
    marginTop: 20,
    color: Colors.PAPER,
  },
  langText: {
    marginRight: 4,
    marginLeft: 4,
    color: "#FFF",
  },
});

export default stylesDark;
