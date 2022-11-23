import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Rating } from "../../@types";
import { RouteNames } from "../../constants/routeNames";
import styles from "./styles";

export type Days = {
  day: string;
  isRented: boolean;
};

export type PlaceItemProps = {
  id: string;
  name: string;
  address: string;
  hourValue: string;
  imageUrl: string;
  user?: string;
  rating?: Rating[];
  days?: Days[];
  availableTimeId: any;
};

const PlaceItem: React.FC<PlaceItemProps> = ({
  id,
  name,
  address,
  imageUrl,
  hourValue,
  availableTimeId,
}) => {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() =>
        navigate(RouteNames.PRIVATE.PLACES.PLACE_DETAILS, {
          placeId: id,
          availableTimeId,
        })
      }
    >
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
          <Text style={styles.address}>R$ {hourValue}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceItem;
