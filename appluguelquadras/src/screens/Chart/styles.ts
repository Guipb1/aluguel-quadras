import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  textChart: {
    padding: 20,
    fontSize: 18,
  },
  marginVertical: {
    marginVertical: 20,
    alignItems: "center",
    marginBottom: 35,
  },
  textBetterAndWorst: {
    fontSize: 18,
  },
  picker: {
    color: Colors.DARK,
    width: 200,
    height: 100,
  },
  viewUserBasic: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.PAPER,
  },
  textUserBasic: {
    fontSize: 18,
  },
  image: {
    marginTop: 20,
    width: 300,
    height: 300,
    borderRadius: 80,
  },
});

export default styles;
