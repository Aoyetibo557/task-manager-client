import { createContext, useContext, useState, useEffect } from "react";
import API from "../../../lib/hooks/axios";
import { auth } from "../../../lib/firebase";
import { ActionTypes } from "@/lib/utils/actions";
import { User, ReturnObject } from "@/lib/utils/types";

const LOGIN_ROUTE = "/auth/login";
const SIGNUP_ROUTE = "/auth/signup";
const FINDUSERBYEMAIL_ROUTE = "/auth/finduser";
const FIND_USER_BY_ID_ROUTE = "/auth/finduserbyid";

type AuthContextType = {
  user: {};
  loading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  findUserByEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  dispatch: (action: { type: string; payload: boolean }) => void;
  setUser: (user: {}) => void;
  isLoggedIn: boolean;
  handleSetUser: (user: {}) => void;
  isTaskActionDispatched: boolean;
  isTaskPinned: boolean;
  isUserActionDispatched: boolean;
  isBoardActionDispatched: boolean;
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
  dispatch: () => {},
  setUser: () => {},
  isLoggedIn: false,
  handleSetUser: () => {},
  isTaskActionDispatched: false,
  isTaskPinned: false,
  isUserActionDispatched: false,
  isBoardActionDispatched: false,
} as AuthContextType);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{}>({});
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isTaskActionDispatched, setIsTaskAction] = useState(false);
  const [isTaskPinned, setIsTaskPinned] = useState(false);
  const [isUserActionDispatched, setIsUserAction] = useState(false);
  const [isBoardActionDispatched, setIsBoardAction] = useState(false);

  const handleSetUser = (user: {}) => {
    localStorage.setItem(
      "task-user",
      JSON.stringify({ ...user, isLoggedIn: true })
    );
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
    } catch (error: any) {
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
    } catch (error: any) {
      console.error(error);
    }
  }

  const signOut = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      localStorage.removeItem("task-user");
      setUser({});
      setIsLoggedIn(false);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  async function findUserByEmail(email: string): Promise<void> {
    try {
      const response = await API.get(FINDUSERBYEMAIL_ROUTE + `/${email}`);
      return response.data;
    } catch (error: any) {
      console.error(error);
    }
  }

  const checkIsLoggedIn = () => {
    setLoading(true);
    try {
      const storedUser = localStorage.getItem("task-user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      }
    } catch (error: any) {
      console.error(error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const dispatch = (action: { type: string; payload: boolean }) => {
    setIsTaskAction(false);
    setIsUserAction(false);

    switch (action.type) {
      case ActionTypes.UPDATE_USER:
        setIsUserAction(action.payload);
        break;
      case ActionTypes.TASK_CREATED:
        setIsTaskAction(action.payload);
        break;
      case ActionTypes.TASK_DELETED:
        setIsTaskAction(action.payload);
        break;
      case ActionTypes.TASK_UPDATED:
        setIsTaskAction(action.payload);
        break;
      case ActionTypes.TASK_PINACTION:
        setIsTaskPinned(action.payload);
        break;
      case ActionTypes.BOARD_ACTION:
        setIsBoardAction(action.payload);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    checkIsLoggedIn(); // Check if user is logged in
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
    dispatch,
    handleSetUser,
    isTaskPinned,
    isTaskActionDispatched,
    isUserActionDispatched,
    isBoardActionDispatched,
  };

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
};
