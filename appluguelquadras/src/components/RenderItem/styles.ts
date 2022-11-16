import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 16,
    width: 140,
    height: 200,
    flexDirection: "column",
    marginRight: 30,
  },
  bannerItem: {
    width: 160,
    height: 130,
    borderRadius: 8,
  },
  titleApproved: {
    color: Colors.PRIMARY,
    fontSize: 14,
    paddingTop: 2,
  },
  titlePending: {
    color: Colors.PENDING,
    fontSize: 14,
    paddingTop: 2,
  },
});

export default styles;
