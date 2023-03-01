import { useContext } from "react";
import { AuthContext } from "@/components/Layout/_contexts/authcontext.tsx";

export const useAuth = () => useContext(AuthContext);
