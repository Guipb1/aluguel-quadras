import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import useAuthContext from "../../hooks/useAuthContext";
import styles from "./styles";
import stylesDark from "./stylesDark";
import { Colors } from "../../constants/colors";
import {
  updatePassword,
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
} from "firebase/auth";
import TextInput from "../../components/TextInput";
import ScreenHeader from "../../components/ScreenHeader";
import { doc, setDoc } from "firebase/firestore";
import { firestoreInstance } from "../../config/firebase";
import { RouteNames } from "../../constants/routeNames";

const ProfileInfos: React.FC = () => {
  const theme = useColorScheme();
  const { goBack, navigate } = useNavigation();
  const { user, logout, firebaseUser, login, deleteAccount } = useAuthContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    setName(user?.name);
    setEmail(user.email);
  }, []);

  const handleSave = async () => {
    if (!oldPassword.length) {
      Alert.alert("Informe sua senha atual");
      return;
    }
    if (newPassword.length && newPassword.length < 6) {
      Alert.alert("Nova senha muito curta");
      return;
    }

    try {
      if (newPassword.length > 0) {
        await updatePassword(firebaseUser, newPassword);
      }
      await setDoc(doc(firestoreInstance, "users", user.id), {
        ...user,
        name,
        email,
      });
      await login(email, oldPassword);
      Alert.alert("Dados alterados com sucesso!");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      console.log(error);

      Alert.alert("Não foi possivel alterar seus dados. Tente novamente!");
    }
  };

  const handleGoBack = () => {
    goBack();
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      Alert.alert("Não foi possivel sair");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      // navigate(RouteNames.PUBLIC.LOGIN);
    } catch (error) {
      Alert.alert("Não foi possivel deletar sua conta");
    }
  };

  return (
    <View style={theme === "light" ? styles.container : stylesDark.container}>
      <View style={styles.header}>
        <Text
          style={
            theme === "light" ? styles.headerTitle : stylesDark.headerTitle
          }
        >
          Edite sua conta
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
        <ScreenHeader username={user?.name} imageOnly />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.content}
        >
          <View style={styles.separator}>
            <TextInput
              title="entre com seu name"
              keyboardType="default"
              onChangeText={(text) => setName(text)}
              value={name}
            />
          </View>
          <View style={styles.separator}>
            <TextInput
              title="entre com seu email"
              editable={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>

          <View style={styles.separator}>
            <TextInput
              secureTextEntry={true}
              title="Senha atual"
              keyboardType="default"
              onChangeText={(text) => setOldPassword(text)}
              value={oldPassword}
            />
          </View>
          <View style={styles.separator}>
            <TextInput
              secureTextEntry={true}
              title="Nova senha"
              keyboardType="default"
              onChangeText={(text) => setNewPassword(text)}
              value={newPassword}
            />
          </View>

          <TouchableOpacity
            onPress={handleSave}
            style={styles.saveChangesButton}
          >
            <Text style={styles.saveChangesButtonText}>Salvar alterações</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleLogout} style={styles.signOutButton}>
          <Text style={styles.signOutButtonText}>Sair</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteAccoutButton}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.deleteAccoutButtonText}>Deletar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileInfos;
