import React from "react";
import { Text, View, Image } from "react-native";

import styles from "./styles";

export default function BetterPlaces({ data }) {
  return (
    <View style={styles.container}>
      <Image
        source={
          data?.imageUrl
            ? { uri: data?.imageUrl }
            : require("../../assets/placeholder.jpeg")
        }
        style={styles.bannerItem}
      />
      <View style={styles.viewText}>
        <Text style={styles.text} numberOfLines={1}>
          {data?.place}
        </Text>
        <Text style={styles.rate} numberOfLines={1}>
          {data?.rate}/5
        </Text>
      </View>
    </View>
  );
}
