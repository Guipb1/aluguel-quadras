import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";

import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import PlaceItem, { PlaceItemProps } from "../../components/PlaceItem";

import styles from "./styles";
import { Colors } from "../../constants/colors";
import { RouteNames } from "../../constants/routeNames";
import { useNavigation } from "@react-navigation/native";
import { firestoreInstance } from "../../config/firebase";
import useAuthContext from "../../hooks/useAuthContext";

// import { Container } from './styles';

const Places: React.FC = () => {
  const { navigate } = useNavigation();
  const { user } = useAuthContext();

  const [data, setData] = useState<PlaceItemProps[]>([]);

  useEffect(() => {
    const placesByUser = query(
      collection(firestoreInstance, "places"),
      where("user", "==", user.id)
    );
    const listner = onSnapshot(placesByUser, (snapshot) => {
      const result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setData(result);
    });

    return listner;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PlaceItem {...item} />}
          ListHeaderComponent={() => (
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderTitle}>Suas quadras</Text>
            </View>
          )}
          stickyHeaderIndices={[0, 0]}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          contentContainerStyle={styles.list}
        />
      </View>
      <TouchableOpacity
        style={styles.newPlaceButton}
        activeOpacity={0.8}
        onPress={() => navigate(RouteNames.PRIVATE.PLACES.NEW_PLACE)}
      >
        <Icon name="plus" size={32} color={Colors.TEXT_SECONDARY} />
      </TouchableOpacity>
    </View>
  );
};
export default Places;
