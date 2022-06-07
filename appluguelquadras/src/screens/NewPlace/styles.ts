import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PAPER,
  },

  header: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerCloseButton: {},
  content: {
    paddingHorizontal: 20,
  },
  inputSeparator: {
    marginBottom: 16,
  },

  confirmButton: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: Colors.PRIMARY,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.TEXT_PRIMARY,
  },
});

export default styles;
