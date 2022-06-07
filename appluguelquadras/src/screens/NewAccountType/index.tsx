import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { RouteNames } from "../../constants/routeNames";

import styles from "./styles";

export default function NewAccountType() {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnLocador}>
        <Text
          style={styles.titleLocador}
          onPress={() => navigate(RouteNames.PUBLIC.NEW_ACCOUNT_BASIC)}
        >
          QUERO JOGAR
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnLocatario}>
        <Text
          style={styles.titleLocatario}
          onPress={() => navigate(RouteNames.PUBLIC.NEW_ACCOUNT_LOCATOR)}
        >
          QUERO ALUGAR
        </Text>
      </TouchableOpacity>
    </View>
  );
}
