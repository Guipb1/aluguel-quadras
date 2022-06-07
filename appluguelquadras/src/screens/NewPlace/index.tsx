import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import styles from "./styles";
import { Colors } from "../../constants/colors";
import TextInput from "../../components/TextInput";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { firestoreInstance } from "../../config/firebase";
import useAuthContext from "../../hooks/useAuthContext";

const NewPlace: React.FC = () => {
  const { goBack } = useNavigation();
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [hourValue, setHourValue] = useState("");
  const [startOperationTime, setStartOperationTime] = useState("");
  const [finishOperationTime, setFinishOperationTime] = useState("");

  const handleGoBack = () => {
    goBack();
  };

  const handleAddPlace = async () => {
    if (
      !name.length ||
      !address.length ||
      !hourValue.length ||
      !startOperationTime.length ||
      !finishOperationTime.length
    ) {
      Alert.alert("Preencha todos os campos");
      return;
    }
    try {
      const newPlace = {
        user: user.id,
        name,
        address,
        startOperationTime,
        finishOperationTime,
        hourValue,
      };
      await addDoc(collection(firestoreInstance, "places"), newPlace);

      goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nova quadra</Text>
        <TouchableOpacity
          style={styles.headerCloseButton}
          onPress={handleGoBack}
        >
          <Icon name="close" size={32} color={Colors.TEXT_PRIMARY} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.content}
        >
          <View style={styles.inputSeparator}>
            <TextInput
              title="Nome"
              keyboardType="default"
              onChangeText={(text) => setName(text)}
              value={name}
            />
          </View>
          <View style={styles.inputSeparator}>
            <TextInput
              title="Endereço"
              keyboardType="default"
              onChangeText={(text) => setAddress(text)}
              value={address}
            />
          </View>
          <View style={styles.inputSeparator}>
            <TextInput
              title="Hora de abertura"
              keyboardType="decimal-pad"
              onChangeText={(text) => setStartOperationTime(text)}
              value={startOperationTime}
            />
          </View>
          <View style={styles.inputSeparator}>
            <TextInput
              title="Hora de fechamento"
              keyboardType="decimal-pad"
              onChangeText={(text) => setFinishOperationTime(text)}
              value={finishOperationTime}
            />
          </View>
          <View style={styles.inputSeparator}>
            <TextInput
              title="Valor da hora"
              keyboardType="decimal-pad"
              onChangeText={(text) => setHourValue(text)}
              value={hourValue}
            />
          </View>
        </KeyboardAvoidingView>
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
