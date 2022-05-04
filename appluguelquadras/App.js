import React from 'react'
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import Login from "./src/pages/login/"
import Cadastro from "./src/pages/cadastro"

const Stack = createStackNavigator()

export default function App() {
  return (
    //pagina padrao
    <NavigationContainer>
      <Stack.Navigator initialRoutName="Login">
        <Stack.Screen
            name="Login"
            component={Login}
            options={{headerTintColor:"#f92e6a"}}
            />

          <Stack.Screen
            name="Cadastro"
            component={Cadastro}
            options={{headerTintColor:"#f92e6a"}}
            />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
 

