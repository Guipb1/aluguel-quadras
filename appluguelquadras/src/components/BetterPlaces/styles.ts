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
  viewText: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.STAR,
    fontSize: 14,
    paddingTop: 2,
  },
  rate: {
    color: Colors.STAR,
    fontSize: 20,
    paddingTop: 3,
  },
});

export default styles;
