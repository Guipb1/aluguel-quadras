import React, { useState, useEffect } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { View, Text, TextInput, useColorScheme } from "react-native";
import { HomeStackParamList } from "../../routes/types";

import styles from "./styles";
import stylesDark from "./stylesDark";
import { getPixService } from "../../services/userService";
import "../../utils/i18n/i18n";
import { useTranslation } from "react-i18next";

const Pay = () => {
  const { t } = useTranslation();
  const theme = useColorScheme();
  const { params } = useRoute<RouteProp<HomeStackParamList>>();
  const [pix, setPix] = useState(t("PAY.LOADING"));

  const getPix = async () => {
    try {
      const data = await getPixService(params.item?.locatorId);
      if (data?.pix) {
        setPix(data?.pix);
      }
    } catch (error: any) {
      console.log("Error get pix: ", error);
    }
  };

  useEffect(() => {
    getPix();
  }, []);

  return (
    <View
      style={
        theme === "light" ? styles.itemContainer : stylesDark.itemContainer
      }
    >
      <View style={styles.viewPix}>
        <Text
          style={
            theme === "light" ? styles.textConfirm : stylesDark.textConfirm
          }
        >
          {t("PAY.TITLE")}
        </Text>
        <TextInput
          style={theme === "light" ? styles.textKeyPix : stylesDark.textKeyPix}
          value={pix}
          focusable
        />
      </View>
    </View>
  );
};

export default Pay;
