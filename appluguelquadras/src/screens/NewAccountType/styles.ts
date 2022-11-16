import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },

  btnLocador: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    borderRadius: 50,
    marginBottom: 50,
  },

  titleLocador: {
    fontWeight: "bold",
  },

  btnLocatario: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    borderRadius: 50,
    marginBottom: 10,
  },

  titleLocatario: {
    fontWeight: "bold",
  },
});

export default styles;
