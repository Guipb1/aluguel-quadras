import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
import stylesDark from "./stylesDark";
import { Colors } from "../../constants/colors";
import { RouteNames } from "../../constants/routeNames";
import { useNavigation } from "@react-navigation/native";
import { firestoreInstance } from "../../config/firebase";
import useAuthContext from "../../hooks/useAuthContext";

import "../../utils/i18n/i18n";
import { useTranslation } from "react-i18next";

const Places: React.FC = () => {
  const { t } = useTranslation();
  const theme = useColorScheme();
  const { navigate } = useNavigation();
  const { user } = useAuthContext();

  const [data, setData] = useState<PlaceItemProps[]>([]);

  useEffect(() => {
    const placesByUser = query(
      collection(firestoreInstance, "places"),
      where("user", "==", user.id)
    );
    const allPlaces = query(collection(firestoreInstance, "places"));
    const listner = onSnapshot(
      user?.type === "LOCATOR" ? placesByUser : allPlaces,
      (snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setData(result);
      }
    );

    return listner;
  }, []);

  return (
    <SafeAreaView
      style={theme === "light" ? styles.container : stylesDark.container}
    >
      <View style={styles.content}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PlaceItem {...item} />}
          ListHeaderComponent={() => (
            <View
              style={
                theme === "light" ? styles.listHeader : stylesDark.listHeader
              }
            >
              <Text
                style={
                  theme === "light"
                    ? styles.listHeaderTitle
                    : stylesDark.listHeaderTitle
                }
              >
                {user?.type === "LOCATOR"
                  ? t("PLACES.LOCATOR")
                  : t("PLACES.BASIC")}
              </Text>
            </View>
          )}
          stickyHeaderIndices={[0, 0]}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          contentContainerStyle={styles.list}
        />
      </View>
      {user?.type === "LOCATOR" && (
        <TouchableOpacity
          style={styles.newPlaceButton}
          activeOpacity={0.8}
          onPress={() => navigate(RouteNames.PRIVATE.PLACES.NEW_PLACE)}
        >
          <Icon name="plus" size={32} color={Colors.TEXT_SECONDARY} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};
export default Places;
