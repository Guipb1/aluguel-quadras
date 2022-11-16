import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  useColorScheme,
  Image,
} from "react-native";

import { firebase } from "../../config/firebase";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";

import styles from "./styles";
import stylesDark from "./stylesDark";
import { Colors } from "../../constants/colors";
import TextInput from "../../components/TextInput";
import useAuthContext from "../../hooks/useAuthContext";
import { TimeType } from "../../@types";
import TimeChip from "../../components/TimeChip";
import { addPlace } from "../../services/placeService";

const NewPlace: React.FC = () => {
  const theme = useColorScheme();
  const { goBack } = useNavigation();
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [hourValue, setHourValue] = useState("");
  const [image, setImage] = useState(null);

  const [availableTimes, setAvailableTimes] = useState<TimeType[]>([]);

  const handleGoBack = () => {
    goBack();
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
          uri: image.uri ? image.uri : "",
        };
      });
      const [uri] = source;
      setImage(uri);
    } catch (error: any) {
      console.log("Error image: ", error);
    }
  };

  const handleAddPlace = async () => {
    if (
      !name.length ||
      !address.length ||
      !hourValue.length ||
      !availableTimes.length ||
      (availableTimes.length &&
        availableTimes[availableTimes.length - 1].initialTime.startsWith(
          "00"
        ) &&
        availableTimes[availableTimes.length - 1].finalTime.startsWith("00"))
    ) {
      Alert.alert("Preencha todos os campos");
      return;
    }
    try {
      let getImageURL;
      if (image !== null) {
        const response = await fetch(image.uri);
        const blob = await response.blob();
        const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
        let ref = firebase.storage().ref().child(filename).put(blob);

        try {
          await ref;
        } catch (error: any) {
          console.log("Error up firebase image: ", error);
        }
        setImage(null);

        getImageURL = await firebase
          .storage()
          .ref(image.uri.substring(image.uri.lastIndexOf("/") + 1))
          .getDownloadURL();
      }
      await addPlace(
        image,
        name,
        address,
        hourValue,
        availableTimes,
        user,
        getImageURL
      );

      goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveTime = (id: string) => {
    setAvailableTimes((oldTimes) => oldTimes.filter((time) => time.id !== id));
  };
  const handleAddTime = () => {
    if (availableTimes.length > 20) {
      Alert.alert("Limite de horários atingido");
      return;
    } else if (
      availableTimes.length &&
      availableTimes[availableTimes.length - 1].initialTime.startsWith("00") &&
      availableTimes[availableTimes.length - 1].finalTime.startsWith("00")
    ) {
      Alert.alert("Edite todos os seus horários para poder incluir um novo");
      return;
    }
    const newTime = {
      id: String(availableTimes.length),
      initialTime: "00:00",
      finalTime: "00:00",
      days: [
        { day: "Segunda", isRented: false },
        { day: "Terça", isRented: false },
        { day: "Quarta", isRented: false },
        { day: "Quinta", isRented: false },
        { day: "Sexta", isRented: false },
      ],
    };
    setAvailableTimes((oldTimes) => [...oldTimes, newTime]);
  };

  const handleChangeInitialTime = (id: string, date: any) => {
    const time = new Date(date).getHours();

    const currentTime = availableTimes.find((item) => item.id === id);
    setAvailableTimes((oldTimes) =>
      oldTimes.map((item) =>
        item.id === id
          ? {
              ...item,
              initialTime: time.toString().concat(":00"),
              finalTime:
                time >= Number(currentTime.finalTime.substring(0, 2))
                  ? (time + 1).toString().concat(":00")
                  : item.finalTime,
            }
          : item
      )
    );
  };
  const handleChangeFinalTime = (id: string, date: any) => {
    const time = new Date(date).getHours();
    const currentTime = availableTimes.find((item) => item.id === id);
    setAvailableTimes((oldTimes) =>
      oldTimes.map((item) =>
        item.id === id
          ? {
              ...item,
              finalTime: time.toString().concat(":00"),
              initialTime:
                time <= Number(currentTime.initialTime.substring(0, 2))
                  ? (time - 1).toString().concat(":00")
                  : item.initialTime,
            }
          : item
      )
    );
  };

  return (
    <View style={theme === "light" ? styles.container : stylesDark.container}>
      <View style={styles.header}>
        <Text
          style={
            theme === "light" ? styles.headerTitle : stylesDark.headerTitle
          }
        >
          Nova quadra
        </Text>
        <TouchableOpacity
          style={styles.headerCloseButton}
          onPress={handleGoBack}
        >
          <Icon
            name="close"
            size={32}
            color={theme === "light" ? Colors.TEXT_PRIMARY : Colors.PAPER}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.separator}>
            <TextInput
              title="Nome"
              keyboardType="default"
              onChangeText={(text) => setName(text)}
              value={name}
            />
          </View>
          <View style={styles.separator}>
            <TextInput
              title="Endereço"
              keyboardType="default"
              onChangeText={(text) => setAddress(text)}
              value={address}
            />
          </View>
          <View style={styles.separator}>
            <TextInput
              title="Valor da hora"
              keyboardType="decimal-pad"
              onChangeText={(text) => setHourValue(text)}
              value={hourValue}
            />
          </View>
          <TouchableOpacity style={styles.pickImage} onPress={pickImage}>
            <Text>Importar imagem da quadra</Text>
          </TouchableOpacity>
          {image && (
            <View style={styles.viewImage}>
              <Image
                source={{ uri: image.uri ? image.uri : "" }}
                style={styles.image}
              />
            </View>
          )}
          <View style={styles.addTimesContainer}>
            <Text
              style={
                theme === "light"
                  ? styles.addTimesTitle
                  : stylesDark.addTimesTitle
              }
            >
              Disponibilize horários: Máx 20
            </Text>
            <TouchableOpacity
              style={styles.addTimesButton}
              onPress={handleAddTime}
            >
              <Text>Novo horário</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator}>
            {availableTimes.map((item) => (
              <View style={styles.separator}>
                <TimeChip
                  key={item.id}
                  id={item.id}
                  initialTime={item.initialTime}
                  finalTime={item.finalTime}
                  onRemove={() => handleRemoveTime(item.id)}
                  onChangeInitialTime={(date) =>
                    handleChangeInitialTime(item.id, date)
                  }
                  onChangeFinalTime={(date) =>
                    handleChangeFinalTime(item.id, date)
                  }
                  isOwner={true}
                />
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={styles.confirmButton}
          activeOpacity={0.8}
          onPress={handleAddPlace}
        >
          <Text style={styles.confirmButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default NewPlace;
