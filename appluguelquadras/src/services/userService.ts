import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { authInstance, firestoreInstance } from "../config/firebase";
import { UserProps } from "../contexts/AuthContext";

export type Reserve = {
  place: string;
  day: string;
  scheduleId: string;
};

export type RegisterUserProps = {
  name: string;
  email: string;
  password: string;
  type: "LOCATOR" | "BASIC";
  reserve?: Reserve[];
  pix?: string;
};

export const registerUser = async (userData: RegisterUserProps) => {
  if (
    !userData.email.length ||
    !userData.name.length ||
    !userData.password.length
  ) {
    Alert.alert("Informe todos os campos");
    return;
  }

  try {
    const userCredentials = await createUserWithEmailAndPassword(
      authInstance,
      userData.email,
      userData.password
    );
    const newUser: UserProps = {
      id: userCredentials.user.uid,
      name: userData.name,
      email: userData.email,
      type: userData.type,
      pix: userData.pix ? userData.pix : "",
    };
    await setDoc(
      doc(firestoreInstance, "users", userCredentials.user.uid),
      newUser
    );
  } catch (error) {
    console.log(error);
  }
};
