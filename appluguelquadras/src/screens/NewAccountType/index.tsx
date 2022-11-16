import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { RouteNames } from "../../constants/routeNames";

import styles from "./styles";
import stylesDark from "./stylesDark";

export default function NewAccountType() {
  const theme = useColorScheme();
  const { navigate } = useNavigation();

  return (
    <View style={theme === "light" ? styles.container : stylesDark.container}>
      <TouchableOpacity
        style={styles.btnLocador}
        onPress={() => navigate(RouteNames.PUBLIC.NEW_ACCOUNT_BASIC)}
      >
        <Text style={styles.titleLocador}>QUERO JOGAR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnLocatario}
        onPress={() => navigate(RouteNames.PUBLIC.NEW_ACCOUNT_LOCATOR)}
      >
        <Text style={styles.titleLocatario}>QUERO ALUGAR</Text>
      </TouchableOpacity>
    </View>
  );
}
