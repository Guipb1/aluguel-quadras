import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import RootRoutes from "./src/routes";

import { AuthContextProvider } from "./src/contexts/AuthContext";

export default function App() {
  return (
    //pagina padrao
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" animated />
        <AuthContextProvider>
          <RootRoutes />
        </AuthContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
