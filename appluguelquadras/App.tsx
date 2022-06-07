import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import RootRoutes from "./src/routes";
import { StatusBar } from "expo-status-bar";

import { AuthContextProvider } from "./src/contexts/AuthContext";

export default function App() {
  return (
    //pagina padrao
    <NavigationContainer>
      <StatusBar style="dark" animated />
      <AuthContextProvider>
        <RootRoutes />
      </AuthContextProvider>
    </NavigationContainer>
  );
}
