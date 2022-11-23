import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },

  title: {
    fontSize: 32,
    color: Colors.PRIMARY,
    marginBottom: 32,
    fontWeight: "bold",
  },

  buttonLogin: {
    alignSelf: "stretch",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonError: {
    backgroundColor: "#ddd",
  },

  textButtonLogin: {
    color: "black",
  },

  contentAlert: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  warningAlert: {
    paddingLeft: 10,
    color: "#bdbdbd",
    fontSize: 16,
  },

  registration: {
    marginTop: 20,
    color: "#4d5156",
  },

  linkSubscribe: {
    color: "#1877f2",
    fontSize: 16,
  },

  separator: {
    marginBottom: 16,
    width: "100%",
  },

  showPassword: {
    width: "100%",
    flexDirection: "row-reverse",
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
