import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PAPER,
  },

  header: {
    marginTop: 20,
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
  separator: {
    marginBottom: 16,
  },
  addTimesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },

  addTimesTitle: {
    fontWeight: "bold",
  },

  addTimesButton: {
    backgroundColor: Colors.BACKGROUND,
    padding: 8,
    borderRadius: 6,
  },

  pickImage: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 5,
    backgroundColor: Colors.PRIMARY,
    width: "100%",
    marginBottom: 15,
  },

  confirmButton: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: Colors.PRIMARY,
    marginBottom: 100,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.TEXT_PRIMARY,
  },
  viewImage: {
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 2,
  },
});

export default styles;
