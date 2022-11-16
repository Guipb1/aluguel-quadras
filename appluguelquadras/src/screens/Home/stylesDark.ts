import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARK,
    marginBottom: 60,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: Colors.DARK,
    marginHorizontal: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: Colors.PRIMARY,
    borderTopWidth: 8,
    padding: 20,
  },
  header: {
    height: 300,
    backgroundColor: Colors.DARK,
  },
  textImageWithoutReserve: {
    fontSize: 18,
    textAlign: "justify",
    color: Colors.PAPER,
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
  valueHourText: {
    fontWeight: "bold",
    marginTop: 5,
    fontSize: 18,
    color: Colors.PAPER,
  },
  rate: {
    fontSize: 24,
    color: Colors.PAPER,
  },
  textThemeDarkOrLight: {
    color: Colors.PAPER,
  },
  evaluatePlace: {
    marginTop: 30,
    textAlign: "center",
    color: Colors.PAPER,
  },
});

export default stylesDark;
