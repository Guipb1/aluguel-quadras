import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";

import styles from "./styles";

export default function SliderItem({
  data,
  setModalVisible,
  modalVisible,
  setItem,
}) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.71}
      onPress={() => {
        setItem(data);
        setModalVisible(!modalVisible);
      }}
    >
      <Image
        style={styles.bannerItem}
        source={
          data?.imageUrl
            ? { uri: data?.imageUrl }
            : require("../../assets/placeholder.jpeg")
        }
      />
      <Text
        style={
          data.day?.status === "APROVADO"
            ? styles.titleApproved
            : styles.titlePending
        }
        numberOfLines={1}
      >
        {data.day?.day}
      </Text>
      <Text
        style={
          data.day?.status === "APROVADO"
            ? styles.titleApproved
            : styles.titlePending
        }
        numberOfLines={1}
      >
        {data?.initialTime} às {data?.finalTime}
      </Text>
    </TouchableOpacity>
  );
}
