import { useContext } from "react";
import AuthContext, { AuthContextProps } from "../../contexts/AuthContext";

export default function useAuthContext(): AuthContextProps {
  const {
    initializing,
    loading,
    user,
    firebaseUser,
    hasUser,
    login,
    logout,
    deleteAccount,
    setUser
  } = useContext(AuthContext);

  return {
    initializing,
    loading,
    user,
    firebaseUser,
    hasUser,
    login,
    logout,
    deleteAccount,
    setUser
  };
}
