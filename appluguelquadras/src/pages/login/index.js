import React, {useState, useEffect} from 'react'
import {View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView} from "react-native"
import firebase from "../../config/firebase"
import styles from "./style"
import {MaterialCommunityIcons} from "@expo/vector-icons"

export default function Login({navigation}){

    //criando state do email e senha
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //tentando logar em branco
    const [errorLogin, setErrorLogin] = useState("");


    //funcao de login
    const loginFirebase = ()=>{
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
    // se logar faça
    let user = userCredential.user;            
                                    //recuperando o id
    navigator.navigate("Cadastro", {idUser:user.uid})
  })
  .catch((error) => {
    setErrorLogin(true)
    let errorCode = error.code;
    let errorMessage = error.message;
  });
    }

    useEffect (()=>{

    }, []);



    return(
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                              style={styles.container}>

        <Text style={styles.title}>Quadras de Aluguel</Text>
        <TextInput style={styles.input}
                    placeholder="enter your email"
                    type="text"
                    onChangeText={(text) =>setEmail(text)} 
                    value={email}/>
        
        <TextInput style={styles.input}
                    secureTextEntry={true}
                    placeholder="enter your password"
                    type="text"
                    onChangeText={(text) =>setPassword(text)} 
                    value={password}/>

        {errorLogin === true
        ?
        <View style={styles.contentAlert}>
            <MaterialCommunityIcons name="alert-circle"
                                    size={24}
                                    color="#bdbdbd"
                                    />
            <Text style={styles.warningAlert}>Invalid email or password</Text>
        </View>
        :
        <View/>
        }
         { email === "" || password === ""
         ?
         <TouchableOpacity disabled={true}
                           style={styles.buttonLogin}
                           >
                <Text style={styles.textButtonLogin}>Login</Text>

         </TouchableOpacity>
         :
         <TouchableOpacity style={styles.buttonLogin}
                            onPress={loginFirebase}
                           >
                <Text style={styles.textButtonLogin}>Login</Text>
         </TouchableOpacity>
        }

        <Text style={styles.registration}>
            Don't have a registration?
            <Text style={styles.linkSubscribe}
                onPress={() => navigation.navigate("Cadastro")}
                >
                    Subscribe Now....
            </Text>
        </Text>

        
        <View style={{height:100}}/>

        </KeyboardAvoidingView>
    );
}