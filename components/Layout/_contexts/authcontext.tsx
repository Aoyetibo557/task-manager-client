import { createContext, useContext, useState, useEffect } from "react";
import API from "../../../lib/hooks/axios";
import { auth } from "../../../lib/firebase";
import axios from "axios";

const LOGIN_ROUTE = "/auth/login";
const SIGNUP_ROUTE = "/auth/signup";
const FINDUSERBYEMAIL_ROUTE = "/auth/finduser";

type AuthContextType = {
  user: {};
  loading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  findUserByEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  user: {},
  loading: true,
  error: null,
  signIn: async () => {},
  signUp: async () => {},
  findUserByEmail: async () => {},
  signOut: async () => {},
} as AuthContextType);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{} | null>({});
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSetUser = (user: {}) => {
    localStorage.setItem("task-user", JSON.stringify(user));
    setIsLoggedIn(true);
    setUser(user);
    setLoading(false);
  };

  const handleAuthStateChanged = (user: {}) => {
    setLoading(false);
  };

  async function signIn(email: string, password: string): Promise<void> {
    try {
      const response = await API.post(LOGIN_ROUTE, { email, password });
      setUser(response.data.user);
      handleSetUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function signUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<void> {
    try {
      const response = await API.post(SIGNUP_ROUTE, {
        email,
        password,
        firstName,
        lastName,
      });
      setUser(response.data.user);
      handleSetUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  const signOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      setError(error);
    }
  };

  async function findUserByEmail(email: string): Promise<void> {
    try {
      const response = await API.get(FINDUSERBYEMAIL_ROUTE + `/${email}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  const checkIsLoggedIn = () => {
    try {
      // const user = JSON.parse(localStorage.getItem("task-user") || "{}");
      const user = localStorage.getItem("task-user");

      if (user) {
        setUser(JSON.parse(user));
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkIsLoggedIn();
    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChanged);
    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    error,
    signIn,
    signUp,
    findUserByEmail,
    signOut,
    setUser,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
};
