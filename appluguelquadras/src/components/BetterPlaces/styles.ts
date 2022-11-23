import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 16,
    width: 140,
    height: 300,
    flexDirection: "column",
    marginHorizontal: 20,
    alignItems: 'center'
  },
  bannerItem: {
    width: 160,
    height: 130,
    borderRadius: 8,
  },
  viewText: {
    alignItems: "center",
    justifyContent: "center",
    width: '100%'
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
