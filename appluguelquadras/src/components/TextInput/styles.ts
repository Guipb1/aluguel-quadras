import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: Colors.BACKGROUND,
  },
  input: {
    alignSelf: "stretch",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
});
export default styles;
