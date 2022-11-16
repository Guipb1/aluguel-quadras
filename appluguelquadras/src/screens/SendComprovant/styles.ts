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
  image: {
    width: 300,
    height: 300,
  },
  sendComprovatText: {
    fontSize: 24,
    marginBottom: 20,
  },
  viewTextStatus: {
    borderRadius: 5,
    width: "100%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  textStatus: {
    textAlign: "center",
    fontSize: 18,
    color: Colors.PAPER,
  },
  bookingButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.PAPER,
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
});

export default styles;
