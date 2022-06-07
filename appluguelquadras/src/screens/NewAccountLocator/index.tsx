import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";

import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RouteNames } from "../../constants/routeNames";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authInstance } from "../../config/firebase";

export default function NewAccountLocator() {
  const { navigate } = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [cnpj, setCNPJ] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  //tentando logar em branco
  const [errorCadastro, setErrorCadastro] = useState(false);

  const handleRegister = () => {
    authInstance.currentUser;
    createUserWithEmailAndPassword(authInstance, email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        navigate(RouteNames.PRIVATE.HOME.ROOT);
      })
      .catch((error) => {
        setErrorCadastro(true);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Criar nova conta</Text>
      <TextInput
        style={styles.input}
        placeholder="entre com seu email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="entre com seu cnpj"
        keyboardType="numbers-and-punctuation"
        onChangeText={(text) => setCNPJ(text)}
        value={cnpj}
      />

      <TextInput
        style={styles.input}
        placeholder="entre com a razao social"
        keyboardType="default"
        onChangeText={(text) => setRazaoSocial(text)}
        value={razaoSocial}
      />

      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="entre com sua senha"
        keyboardType="default"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <TextInput
        style={styles.input}
        placeholder="entre com seu nome"
        keyboardType="default"
        onChangeText={(text) => setNome(text)}
        value={nome}
      />

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
        onPress={handleRegister}
        disabled={email === "" || password === ""}
      >
        <Text style={styles.textButtonRegister}>Registrar</Text>
      </TouchableOpacity>

      <Text style={styles.login}>
        Voce já está registrado?
        <Text
          style={styles.linkLogin}
          onPress={() => navigate(RouteNames.PUBLIC.LOGIN)}
        >
          Login...
        </Text>
      </Text>

      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
}
