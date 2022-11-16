import React, { createContext, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import { authInstance, firestoreInstance } from "../../config/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

type Reserve = {
  place: string;
  day: string;
  scheduleId: string;
};

export type UserProps = {
  id: string;
  name: string;
  email: string;
  type: "LOCATOR" | "BASIC";
  reserve?: Reserve[];
  pix?: string;
};

export type AuthContextProps = {
  initializing: boolean;
  loading: boolean;
  hasUser: boolean;
  user: UserProps | undefined;
  firebaseUser: User | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  setUser: Function;
};

const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserProps | undefined>();
  const [firebaseUser, setFirebaseUser] = useState<User | undefined>();
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const listener = onAuthStateChanged(authInstance, async (loggedUser) => {
      if (loggedUser) {
        const userById = doc(firestoreInstance, "users", loggedUser.uid);
        const docSnap = await getDoc(userById);

        const userInfos = docSnap.data() as UserProps;
        setFirebaseUser(loggedUser);
        setUser(userInfos);
      } else {
        setFirebaseUser(loggedUser);
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
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      setLoading(true);
      await signOut(authInstance);
      setFirebaseUser(undefined);
      setUser(undefined);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    try {
      setLoading(true);
      await firebaseUser.delete();
      await deleteDoc(doc(firestoreInstance, "users", user.id));

      setFirebaseUser(undefined);
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
        firebaseUser,
        login,
        logout,
        deleteAccount,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
