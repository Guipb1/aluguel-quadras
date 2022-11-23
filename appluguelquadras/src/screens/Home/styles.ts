import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    marginBottom: 60,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    marginHorizontal: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: Colors.PRIMARY,
    borderTopWidth: 8,
    padding: 20,
  },
  content: {
    flex: 1,
  },
  marginVertical: {
    marginVertical: 15,
  },
  marginHorizontal: {
    marginHorizontal: 15,
  },
  marginTop: {
    marginTop: 15,
  },
  textPending: {
    color: Colors.PENDING,
    fontSize: 16,
  },
  textBetterPlaces: {
    color: Colors.STAR,
    fontSize: 16,
  },
  textApproved: {
    color: Colors.PRIMARY,
    fontSize: 16,
  },
  header: {
    height: 300,
    backgroundColor: Colors.BACKGROUND,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  viewImageWithoutReserve: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    margin: 8,
  },

  viewTextImageWithoutReserve: {
    marginRight: 5,
    width: 180,
  },
  textImageWithoutReserve: {
    fontSize: 18,
    textAlign: "justify",
  },
  imageWithoutReserve: {
    width: 170,
    height: 170,
    borderRadius: 100,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addressText: {
    marginVertical: 4,
  },
  infoContainer: {
    marginTop: 12,
    alignItems: "center",
  },
  valueHourText: {
    fontWeight: "bold",
    marginTop: 5,
    fontSize: 18,
  },
  closeButton: {
    alignItems: "flex-end",
  },
  viewStatus: {
    height: 100,
    alignItems: "center",
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
  bookingButton: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 5,
    width: "45%",
  },
  bookingButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.PAPER,
  },
  viewButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  closeModalButton: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 5,
    backgroundColor: Colors.PRIMARY,
    width: "100%",
  },
  viewRate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rate: {
    fontSize: 24,
  },
  textThemeDarkOrLight: {
    color: Colors.TEXT_PRIMARY,
  },
  notSendComprovant: {
    color: Colors.TEXT_PRIMARY,
    marginTop: 20
  },
  evaluatePlace: {
    marginTop: 30,
    textAlign: "center",
  },
  sendingRequest: {
    marginTop: 5,
    color: Colors.PENDING,
    fontSize: 16,
    textAlign: "center",
  },
  sendRequest: {
    marginTop: 5,
    color: "#1877f2",
    fontSize: 16,
    textAlign: "center",
  },
  marginBottom: {
    marginBottom: 5,
  },
  imageComprovant: {
    width: 300,
    height: 300,
  },
});

export default styles;
