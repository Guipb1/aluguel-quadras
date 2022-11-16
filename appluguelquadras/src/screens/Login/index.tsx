import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
  Alert,
  useColorScheme,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";
import styles from "./styles";
import stylesDark from "./stylesDark";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RouteNames } from "../../constants/routeNames";
import useAuthContext from "../../hooks/useAuthContext";
import { Colors } from "../../constants/colors";
import TextInput from "../../components/TextInput";

export default function Login() {
  const theme = useColorScheme();
  const { navigate } = useNavigation();

  const { login, loading, hasUser } = useAuthContext();

  //criando state do email e senha
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //tentando logar em branco
  const [errorLogin, setErrorLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //funcao de login
  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={theme === "light" ? styles.container : stylesDark.container}
      >
        <Text style={styles.title}>Quadras de Aluguel</Text>
        <View style={styles.separator}>
          <TextInput
            title="Informe seu e-mail"
            keyboardType="email-address"
            onFocus={() => setErrorLogin(false)}
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
          />
        </View>
        <View style={styles.separator}>
          <TextInput
            secureTextEntry={showPassword ? false : true}
            title="Informe sua senha"
            keyboardType="default"
            onFocus={() => setErrorLogin(false)}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>

        <View style={styles.showPassword}>
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? "eye-slash" : "eye"}
              size={18}
              color={theme === "light" ? Colors.TEXT_PRIMARY : Colors.PAPER}
            />
          </TouchableOpacity>
        </View>
        {errorLogin && (
          <View style={styles.contentAlert}>
            <MaterialCommunityIcons
              name="alert-circle"
              size={24}
              color="#bdbdbd"
            />
            <Text style={styles.warningAlert}>Email ou senha invalidos</Text>
          </View>
        )}
        <TouchableOpacity style={[styles.buttonLogin]} onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator color={Colors.TEXT_SECONDARY} size={32} />
          ) : (
            <Text style={styles.textButtonLogin}>Login</Text>
          )}
        </TouchableOpacity>
        <Text
          style={
            theme === "light" ? styles.registration : stylesDark.registration
          }
        >
          Não tem um cadastro?
          <Text
            style={styles.linkSubscribe}
            onPress={() => navigate(RouteNames.PUBLIC.NEW_ACCOUNT_TYPE)}
          >
            {" "}
            Se cadastre agora....
          </Text>
        </Text>
        <View style={{ height: 100 }} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
