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
    alignItems: "center",
    flexDirection: "row",
    padding: 2,
  },
  infoRadio: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemValue: {
    marginRight: 35,
    marginLeft: 20,
    fontSize: 16,
    color: "gray",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
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
  radios: {
    flexDirection: "row",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#fff",
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
    color: Colors.TEXT_PRIMARY,
    fontSize: 20,
  },
  textConfirm: {
    textAlign: "center",
    color: Colors.TEXT_PRIMARY,
    fontSize: 16,
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
    color: Colors.TEXT_PRIMARY,
    fontSize: 16,
  },
});

export default styles;
