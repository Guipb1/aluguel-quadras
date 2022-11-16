import React, { useState, useEffect } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { View, Text, TextInput } from "react-native";
import { HomeStackParamList } from "../../routes/types";

import styles from "./styles";
import { doc, getDoc } from "firebase/firestore";
import { firestoreInstance } from "../../config/firebase";

const Pay = () => {
  const { params } = useRoute<RouteProp<HomeStackParamList>>();
  const [pix, setPix] = useState("Carregando pix...");

  const getPix = async () => {
    try {
      const query = await getDoc(
        doc(firestoreInstance, "users", params.item?.locatorId)
      );
      const data = query.data();
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
    <View style={styles.itemContainer}>
      <View style={styles.viewPix}>
        <Text style={styles.textConfirm}>
          Para confirmar o aluguel, copie o código PIX abaixo e realize o
          pagamento.
        </Text>
        <TextInput style={styles.textKeyPix} value={pix} focusable />
      </View>
    </View>
  );
};

export default Pay;
