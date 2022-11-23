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
import { updatePassword } from "firebase/auth";
import TextInput from "../../components/TextInput";
import ScreenHeader from "../../components/ScreenHeader";
import { doc, setDoc } from "firebase/firestore";
import { firestoreInstance } from "../../config/firebase";
import { RouteNames } from "../../constants/routeNames";
import "../../utils/i18n/i18n";
import { useTranslation } from "react-i18next";

const ProfileInfos: React.FC = () => {
  const { t } = useTranslation();
  const theme = useColorScheme();
  const { goBack } = useNavigation();
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
      Alert.alert(t("PROFILE.ERRORS.ACTUAL_PASSWORD"));
      return;
    }
    if (newPassword.length && newPassword.length < 6) {
      Alert.alert(t("PROFILE.ERRORS.SHORT_PASSWORD"));
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
      Alert.alert(t("PROFILE.ERRORS.SUCCESS"));
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      console.log(error);

      Alert.alert(t("PROFILE.ERRORS.CHANGE"));
    }
  };

  const handleGoBack = () => {
    goBack();
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      Alert.alert(t("PROFILE.ERRORS.EXIT"));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      // navigate(RouteNames.PUBLIC.LOGIN);
    } catch (error) {
      Alert.alert(t("PROFILE.ERRORS.DELETE_ACCOUNT"));
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
          {t("PROFILE.EDIT")}
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
              title={t("PROFILE.NAME")}
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
              title={t("PROFILE.ACTUAL_PASSWORD")}
              keyboardType="default"
              onChangeText={(text) => setOldPassword(text)}
              value={oldPassword}
            />
          </View>
          <View style={styles.separator}>
            <TextInput
              secureTextEntry={true}
              title={t("PROFILE.NEW_PASSWORD")}
              keyboardType="default"
              onChangeText={(text) => setNewPassword(text)}
              value={newPassword}
            />
          </View>

          <TouchableOpacity
            onPress={handleSave}
            style={styles.saveChangesButton}
          >
            <Text style={styles.saveChangesButtonText}>
              {t("PROFILE.SAVE")}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleLogout} style={styles.signOutButton}>
          <Text style={styles.signOutButtonText}>{t("PROFILE.EXIT")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteAccoutButton}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.deleteAccoutButtonText}>
            {t("PROFILE.DELETE")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileInfos;
