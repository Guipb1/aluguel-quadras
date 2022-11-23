import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Alert,
  useColorScheme,
} from "react-native";

import styles from "./styles";
import stylesDark from "./stylesDark";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RouteNames } from "../../constants/routeNames";
import { registerUser } from "../../services/userService";
import TextInput from "../../components/TextInput";
import "../../utils/i18n/i18n";
import { useTranslation } from "react-i18next";

export default function NewAccountLocator() {
  const { t } = useTranslation();
  const theme = useColorScheme();
  const { navigate } = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pix, setPix] = useState("");
  const [name, setName] = useState("");
  const [errorCadastro, setErrorCadastro] = useState(false);

  const handleRegisterUser = async () => {
    try {
      registerUser({ name, email, password, type: "LOCATOR", pix });
    } catch (error) {
      Alert.alert("nao foi possivel criar usuario");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={theme === "light" ? styles.container : stylesDark.container}
    >
      <Text style={styles.title}>{t("REGISTER.NEW_ACCOUNT")}</Text>
      <View style={styles.separator}>
        <TextInput
          title={t("REGISTER.NAME")}
          keyboardType="default"
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>
      <View style={styles.separator}>
        <TextInput
          title={t("REGISTER.EMAIL")}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.separator}>
        <TextInput
          title={t("REGISTER.PASSWORD")}
          secureTextEntry={true}
          keyboardType="default"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      <View style={styles.separator}>
        <TextInput
          title={t("REGISTER.PIX")}
          keyboardType="default"
          onChangeText={(text) => setPix(text)}
          value={pix}
        />
      </View>

      {errorCadastro && (
        <View style={styles.contentAlert}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={24}
            color="#bdbdbd"
          />
          <Text style={styles.warningAlert}>Invalid email or password</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.buttonRegister}
        onPress={handleRegisterUser}
      >
        <Text style={styles.textButtonRegister}>{t("REGISTER.REGISTER")}</Text>
      </TouchableOpacity>

      <Text style={theme === "light" ? styles.login : stylesDark.login}>
        {t("REGISTER.ALREADY_REGISTER")}
        <Text
          style={styles.linkLogin}
          onPress={() => navigate(RouteNames.PUBLIC.LOGIN)}
        >
          {" "}
          Login...
        </Text>
      </Text>

      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
}
