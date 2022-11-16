import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: Colors.BACKGROUND,
    marginHorizontal: 5,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textConfirm: {
    textAlign: "center",
    color: Colors.TEXT_PRIMARY,
    fontSize: 16,
  },
  viewPix: {
    height: 100,
    width: 350,
    justifyContent: "space-around",
  },
  textKeyPix: {
    textAlign: "center",
    color: Colors.TEXT_PRIMARY,
    fontSize: 20,
  },
});

export default styles;
