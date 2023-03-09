import { useContext } from "react";
import { AuthContext } from "@/components/Layout/_contexts/authcontext";

export const useAuth = () => useContext(AuthContext);
