import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: Colors.BACKGROUND,
  },
  leftContent: {
    flexDirection: "row",
  },
  timeContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  label: {
    fontWeight: "bold",
  },
  text: {},
  buttonRemove: {},
});
export default styles;
