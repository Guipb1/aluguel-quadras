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
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerCloseButton: {},
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  separator: {
    marginBottom: 16,
  },

  saveChangesButton: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.PRIMARY,
  },
  saveChangesButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.TEXT_PRIMARY,
  },

  footer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 80,
    paddingBottom: 24,
  },

  deleteAccoutButton: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: Colors.RED,
  },

  deleteAccoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.TEXT_PRIMARY,
  },

  signOutButton: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: Colors.BACKGROUND,
    marginBottom: 16,
  },

  signOutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.TEXT_PRIMARY,
  },
  viewButtonLgn: {
    flexDirection: "row",
    width: 100,
    height: 35,
    justifyContent: "space-between",
    alignItems: "center",
  },
  langText: {
    marginRight: 4,
    marginLeft: 4,
    color: Colors.DARK,
  },
  langButton: {
    borderWidth: 1,
    padding: 4,
    borderRadius: 4,
    marginRight: 4,
    marginLeft: 4,
    borderColor: Colors.PRIMARY,
  },
});

export default styles;
