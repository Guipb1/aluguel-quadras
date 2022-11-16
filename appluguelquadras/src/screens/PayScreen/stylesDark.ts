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
  textConfirm: {
    textAlign: "center",
    color: Colors.PAPER,
    fontSize: 16,
  },
  textKeyPix: {
    textAlign: "center",
    color: Colors.PAPER,
    fontSize: 20,
  },
});

export default stylesDark;
