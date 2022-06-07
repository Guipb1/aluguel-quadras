import { useContext } from "react";
import AuthContext, { AuthContextProps } from "../../contexts/AuthContext";

export default function useAuthContext(): AuthContextProps {
  const { initializing, loading, user, hasUser, login, logout } =
    useContext(AuthContext);

  return { initializing, loading, user, hasUser, login, logout };
}
