import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARK,
  },
  textChart: {
    padding: 20,
    fontSize: 18,
    color: Colors.PAPER,
  },
  textBetterAndWorst: {
    fontSize: 18,
    color: Colors.PAPER,
  },
  picker: {
    color: Colors.PAPER,
    width: 200,
    height: 100,
  },
  viewUserBasic: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.DARK,
  },
  textUserBasic: {
    fontSize: 18,
    color: Colors.PAPER,
  },
});

export default stylesDark;
