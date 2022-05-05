import React, {useState} from 'react'
import {View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity} from "react-native"
 import firebase from "../../config/firebase"
import styles from './style'
import {MaterialCommunityIcons} from "@expo/vector-icons"




export default function CadastroLocatario({navigation}){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nome, setNome] = useState("");
    const [cnpj, setCNPJ] = useState("");
    const [razaoSocial, setRazaoSocial] = useState("");
    //tentando logar em branco
    const [errorCadastro, setErrorCadastro] = useState("");

    const cadastrar = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password, nome, cnpj, razaoSocial)
        .then((userCredential) => {
          let user = userCredential.user; 
          navigation.navigate("Login", { idUser: user.uid })
        })
        .catch((error) => {
            setErrorCadastro(true)
          let errorCode = error.code;
          let errorMessage = error.message;
        });
    }

    return(
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        
        <Text style={styles.title}>Criar nova conta</Text>
        <TextInput style={styles.input}
                    placeholder="entre com seu email"
                    type="text"
                    onChangeText={(text) =>setEmail(text)} 
                    value={email}/>
                    
     <TextInput style={styles.input}
                    placeholder="entre com seu cnpj"
                    type="text"
                    onChangeText={(text) =>setCNPJ(text)} 
                    value={cnpj}/>

    <TextInput style={styles.input}
                    placeholder="entre com a razao social"
                    type="text"
                    onChangeText={(text) =>setRazaoSocial(text)} 
                    value={razaoSocial}/>
        
        <TextInput style={styles.input}
                    secureTextEntry={true}
                    placeholder="entre com sua senha"
                    type="text"
                    onChangeText={(text) =>setPassword(text)} 
                    value={password}/>
        
        <TextInput style={styles.input}
                    placeholder="entre com seu nome"
                    type="text"
                    onChangeText={(text) =>setNome(text)} 
                    value={nome}/>


        {errorCadastro === true
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
                           style={styles.buttonRegister}
                           >
                <Text style={styles.textButtonRegister}>Registrar</Text>

         </TouchableOpacity>
         :
         <TouchableOpacity style={styles.buttonRegister}
                            onPress={cadastrar}
                           >
                <Text style={styles.textButtonRegister}>Registrar</Text>
         </TouchableOpacity>
        }

            <Text style={styles.login}>
                        Voce já está registrado?
                <Text style={styles.linkLogin}
                onPress={() => navigation.navigate("Login")}
                >
                    Login...
                </Text>
            </Text>

        
        <View style={{height:100}}/>





        </KeyboardAvoidingView>
    )
}