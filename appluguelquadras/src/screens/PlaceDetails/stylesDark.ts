import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARK,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.PAPER,
  },
  addressText: {
    marginVertical: 4,
    color: Colors.PAPER,
  },
  valueHourLabel: {
    color: Colors.PAPER,
  },
  valueHourText: {
    fontWeight: "bold",
    color: Colors.PAPER,
  },
  timesTitleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    color: Colors.PAPER,
  },
  modalView: {
    marginTop: 20,
    flex: 1,
    backgroundColor: Colors.DARK,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 45,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "space-between",
  },
  textReserved: {
    textAlign: "center",
    color: Colors.PAPER,
    fontSize: 20,
  },
  viewPix: {
    height: 100,
    width: 350,
    alignItems: "center",
  },
  imageModal: {
    width: 300,
    height: 200,
    borderRadius: 5,
  },
  textLeased: {
    textAlign: "center",
    color: Colors.PAPER,
    fontSize: 16,
  },
});

export default stylesDark;
