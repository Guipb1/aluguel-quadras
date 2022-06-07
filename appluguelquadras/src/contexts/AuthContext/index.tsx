import React, { createContext, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { authInstance, firestoreInstance } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { log } from "react-native-reanimated";

export type UserProps = {
  id: string;
  name: string;
  email: string;
  type: "BASIC" | "LOCATOR";
  // cnpj?: string;
};

export type AuthContextProps = {
  initializing: boolean;
  loading: boolean;
  hasUser: boolean;
  user: UserProps | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserProps | undefined>();
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const listener = onAuthStateChanged(authInstance, async (loggedUser) => {
      if (loggedUser) {
        const userById = doc(firestoreInstance, "users", loggedUser.uid);
        const docSnap = await getDoc(userById);

        const userInfos = docSnap.data() as UserProps;

        setUser(userInfos);
      } else {
        setUser(undefined);
      }

      if (initializing) {
        setInitializing(false);
      }
    });

    return listener;
  }, [initializing]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(authInstance, email, password);
    } catch (error) {
      Alert.alert("Falha ao realizar login");
      console.log(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      setLoading(true);
      await signOut(authInstance);
      setUser(undefined);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        initializing,
        loading,
        hasUser: Boolean(user),
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
