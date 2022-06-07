import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export type PlaceItemProps = {
  id: string;
  name: string;
  address: string;
  hourValue: string;
  startOperationTime: string;
  finishOperationTime: string;
  imageUrl: string;
};

const PlaceItem: React.FC<PlaceItemProps> = ({
  name,
  address,
  imageUrl,
  hourValue,
  startOperationTime,
  finishOperationTime,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container}>
      <View>
        <Image
          source={
            imageUrl
              ? { uri: imageUrl }
              : require("../../assets/placeholder.jpeg")
          }
          style={styles.image}
        />
      </View>
      <View style={styles.infos}>
        <Text style={styles.title}>{name}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.address}>{address}</Text>
        </View>
        <View>
          <Text style={styles.address}>{startOperationTime}</Text>
          <Text style={styles.address}>{finishOperationTime}</Text>
        </View>
        <View>
          <Text style={styles.address}>{hourValue}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceItem;
