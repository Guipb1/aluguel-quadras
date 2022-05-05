import React from 'react'
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import Login from "./src/pages/Login"
import Cadastro from "./src/pages/Cadastro"
import BemVindo from "./src/pages/BemVindo"
import CadastroLocatario from "./src/pages/CadastroLocatario"
import Jogar from "./src/pages/Jogar"

const Stack = createStackNavigator()

export default function App() {
  return (
    //pagina padrao
    <NavigationContainer>
      <Stack.Navigator initialRoutName="Login">
        <Stack.Screen
            name="Login"
            component={Login}
            options={{headerTintColor:"black"}}
            />

          <Stack.Screen
            name="Cadastro"
            component={Cadastro}
            options={{headerTintColor:"black"}}
            />

          <Stack.Screen
            name="BemVindo"
            component={BemVindo}
            options={{headerTintColor:"black"}}
            />

          <Stack.Screen
            name="CadastroLocatario"
            component={CadastroLocatario}
            options={{headerTintColor:"black"}}
            />

          <Stack.Screen
            name="Jogar"
            component={Jogar}
            options={{headerTintColor:"black"}}
            />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
 

