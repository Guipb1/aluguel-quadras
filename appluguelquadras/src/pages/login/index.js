import React, {useState, useEffect} from 'react'
import {View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView} from "react-native"
//import firebase from "../../config/firebaseconfig"
import styles from "./style"
import {materialCommunityIcons} from "@expo/vector-icons"

export default function Login({navigation}){

    //criando state do email e senha
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    //tentando logar em branco
    const [errorLogin, setErrorLogin] = useState("");


    //funcao de login
    const loginFirebase = ()=>{

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
                    onChangeText={(text) =>setSenha(text)} 
                    value={senha}/>

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
         { email === "" || senha === ""
         ?
         <TouchableOpacity disabled={true}
                           style={styles.buttonLogin}
                           >
                <Text style={styles.textButtonLogin}>Login</Text>

         </TouchableOpacity>
         :
         <TouchableOpacity style={styles.buttonLogin}
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