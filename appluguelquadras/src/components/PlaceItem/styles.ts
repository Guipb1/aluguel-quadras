import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  image: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  infos: {
    flex: 1,
    alignSelf: "stretch",
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  address: {
    fontSize: 14,
  },
});
export default styles;
