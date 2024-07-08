import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/userService";
import toast from "react-hot-toast";
import { User } from "../entities/user";
import { localStorageKeys } from "../config/localStorageKey";
import LaunchScreen from "../../view/components/launchScreen/LauchScreen";

interface AuthContextValue {
  signedIn: boolean;
  user: User | undefined;
  signin: (acessToken: string) => void;
  signout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAcessToken = localStorage.getItem(localStorageKeys.ACESS_TOKEN);
    return !!storedAcessToken;
  });

  const { isError, isFetching, isSuccess, data } = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => usersService.me(),
    enabled: signedIn,
  });

  const signin = useCallback((acessToken: string) => {
    localStorage.setItem(localStorageKeys.ACESS_TOKEN, acessToken);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACESS_TOKEN);
    setSignedIn(false);
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error("Sua sessão expirou");
      signout();
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        user: data,
        signin,
        signout,
      }}
    >
      <LaunchScreen isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
