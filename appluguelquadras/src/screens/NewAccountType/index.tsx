import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { RouteNames } from "../../constants/routeNames";

import styles from "./styles";
import stylesDark from "./stylesDark";
import "../../utils/i18n/i18n";
import { useTranslation } from "react-i18next";

export default function NewAccountType() {
  const { t } = useTranslation();
  const theme = useColorScheme();
  const { navigate } = useNavigation();

  return (
    <View style={theme === "light" ? styles.container : stylesDark.container}>
      <TouchableOpacity
        style={styles.btnLocador}
        onPress={() => navigate(RouteNames.PUBLIC.NEW_ACCOUNT_BASIC)}
      >
        <Text style={styles.titleLocador}>{t("REGISTER.BASIC")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnLocatario}
        onPress={() => navigate(RouteNames.PUBLIC.NEW_ACCOUNT_LOCATOR)}
      >
        <Text style={styles.titleLocatario}>{t("REGISTER.LOCATOR")}</Text>
      </TouchableOpacity>
    </View>
  );
}
