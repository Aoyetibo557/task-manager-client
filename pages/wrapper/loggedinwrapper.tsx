import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../components/Layout/_contexts/authcontext";
import { useRouter } from "next/router";

const LoggedInWrapper: React.FC = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && !loading) {
      router.push("/loginform");
    }
  }, [loading, isLoggedIn]);
  return <>{children}</>;
};

export default LoggedInWrapper;
