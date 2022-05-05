import React from 'react'
import {View, Text, ImageBackground } from 'react-native'
import styles from "./style"

export default function BemVindo({navigation}) {


    return (
        <View style={styles.container}>
           <ImageBackground source={require('../../../assets/r10.jpg')}
                            style={{width:400,height:400}}
                            />
        </View>
    )

    
}
