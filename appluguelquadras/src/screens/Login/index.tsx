import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
  Alert,
} from "react-native";
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RouteNames } from "../../constants/routeNames";
import useAuthContext from "../../hooks/useAuthContext";
import { Colors } from "../../constants/colors";

export default function Login() {
  const { navigate } = useNavigation();

  const { login, loading, hasUser } = useAuthContext();

  //criando state do email e senha
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //tentando logar em branco
  const [errorLogin, setErrorLogin] = useState(false);

  //funcao de login
  const handleLogin = async () => {
      await login(email, password);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.title}>Quadras de Aluguel</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe seu e-mail"
          keyboardType="email-address"
          autoCompleteType="off"
          autoCapitalize="none"
          onFocus={() => setErrorLogin(false)}
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />

        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Informe sua senha"
          keyboardType="default"
          autoCompleteType="off"
          onFocus={() => setErrorLogin(false)}
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

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

        <Text style={styles.registration}>
          Não tem um cadastro?
          <Text
            style={styles.linkSubscribe}
            onPress={() => navigate(RouteNames.PUBLIC.NEW_ACCOUNT_TYPE)}
          >
            Se cadastre agora....
          </Text>
        </Text>

        <View style={{ height: 100 }} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
