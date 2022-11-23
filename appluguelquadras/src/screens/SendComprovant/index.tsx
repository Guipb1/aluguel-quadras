import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  useColorScheme,
} from "react-native";

import { Colors } from "../../constants/colors";
import * as ImagePicker from "expo-image-picker";

import styles from "./styles";
import stylesDark from "./stylesDark";
import { firebase } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { firestoreInstance } from "../../config/firebase";
import { Rent } from "../../@types";
import { RouteProp, useRoute } from "@react-navigation/native";
import { HomeStackParamList } from "../../routes/types";
import "../../utils/i18n/i18n";
import { useTranslation } from "react-i18next";

const SendComprovant = () => {
  const { t } = useTranslation();
  const theme = useColorScheme();
  const { params } = useRoute<RouteProp<HomeStackParamList>>();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
    setLoading(true);
    try {
      if (image === null) {
        Alert.alert(t("SEND_COMPROVANT.IMAGE"));
        return;
      }
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
      let ref = firebase.storage().ref().child(filename).put(blob);

      try {
        await ref;
      } catch (error: any) {
        console.log("Error up firebase image: ", error);
      }
      Alert.alert(t("SEND_COMPROVANT.SUCCESS"));
      setImage(null);
      try {
        let getImageURL = await firebase
          .storage()
          .ref(image.uri.substring(image.uri.lastIndexOf("/") + 1))
          .getDownloadURL();

        const reservationInReview: any = {
          ...params.item,
          comprovant: getImageURL,
        };
        await updateDoc(
          doc(firestoreInstance, "reserves", params.item.reserveId),
          reservationInReview
        );
      } catch (error: any) {
        console.log("Error get imageURL: ", error);
      }
    } catch (error: any) {
      console.log("Error uploading image: ", error);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [6, 10],
        quality: 1,
      });

      const source = result.assets.map((image) => {
        return {
          uri: image.uri,
        };
      });
      const [uri] = source;
      setImage(uri);
    } catch (error: any) {
      console.log("Error image: ", error);
    }
  };

  return (
    <View
      style={
        theme === "light" ? styles.itemContainer : stylesDark.itemContainer
      }
    >
      <Image />
      <Text
        style={
          theme === "light"
            ? styles.sendComprovatText
            : stylesDark.sendComprovatText
        }
      >
        {t("SEND_COMPROVANT.TITLE")}
      </Text>
      <TouchableOpacity
        style={{
          ...styles.pickImage,
          backgroundColor: Colors.SEND_COMPROVANT,
        }}
        onPress={pickImage}
      >
        <Text style={styles.bookingButtonText}>
          {t("SEND_COMPROVANT.CHOOSE_IMAGE")}
        </Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image.uri }} style={styles.image} />}
      <TouchableOpacity
        style={{ ...styles.pickImage, marginTop: 20 }}
        onPress={uploadImage}
      >
        {loading ? (
          <ActivityIndicator color={Colors.TEXT_SECONDARY} size={32} />
        ) : (
          <Text style={styles.bookingButtonText}>
            {t("SEND_COMPROVANT.SEND")}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SendComprovant;
