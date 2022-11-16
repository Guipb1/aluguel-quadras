import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PAPER,
  },

  content: {
    flex: 1,
    padding: 20,
  },

  header: {
    height: 300,
    backgroundColor: Colors.BACKGROUND,
  },
  image: {
    width: "100%",
    height: "100%",
  },

  titleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addressText: {
    marginVertical: 4,
  },

  infoContainer: {
    flexDirection: "row",
  },
  valueHourLabel: {},
  valueHourText: {
    fontWeight: "bold",
  },

  timesContainer: {
    marginTop: 32,
  },
  timesTitleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  separator: {
    marginBottom: 12,
  },
  footer: {
    marginBottom: 100,
  },
  bookingButton: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: Colors.PRIMARY,
  },
  bookingButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.TEXT_PRIMARY,
  },

  deletePlaceButton: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: Colors.RED,
  },

  deletePlaceButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.TEXT_PRIMARY,
  },
  formsOfPayment: {
    marginHorizontal: 4,
    marginBottom: 16,
  },
  radioGroup: {
    // alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  infoRadio: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  itemValue: {
    marginRight: 25,
    fontSize: 16,
    color: "gray",
    alignItems: "flex-start",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioBorder: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "grey",
  },
  radioBorderSelected: {
    borderColor: "grey",
  },
  radioFill: {
    height: 11,
    width: 11,
    borderRadius: 5,
    backgroundColor: "grey",
  },
});

export default styles;
