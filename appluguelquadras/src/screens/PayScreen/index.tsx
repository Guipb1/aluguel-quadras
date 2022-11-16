import React, { useState, useEffect } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { View, Text, TextInput, useColorScheme } from "react-native";
import { HomeStackParamList } from "../../routes/types";

import styles from "./styles";
import stylesDark from "./stylesDark";
import { doc, getDoc } from "firebase/firestore";
import { firestoreInstance } from "../../config/firebase";
import { getPixService } from "../../services/userService";

const Pay = () => {
  const theme = useColorScheme();
  const { params } = useRoute<RouteProp<HomeStackParamList>>();
  const [pix, setPix] = useState("Carregando pix...");

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
          Para confirmar o aluguel, copie o código PIX abaixo e realize o
          pagamento.
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
