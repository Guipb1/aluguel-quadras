import React from 'react'
import {View, Text, TouchableOpacity } from 'react-native'
import styles from "./style"

export default function BemVindo({navigation}) {


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btnLocador}>
                <Text style={styles.titleLocador}
                              onPress={() =>navigation.navigate("Cadastro") }
                              >
                               QUERO JOGAR   
                              </Text>

            </TouchableOpacity>

            <TouchableOpacity style={styles.btnLocatario}>
                <Text style={styles.titleLocatario}
                              onPress={() =>navigation.navigate("CadastroLocatario") }
                              >
                               QUERO ALUGAR   
                              </Text>

            </TouchableOpacity>
        </View>
    )

    
}
