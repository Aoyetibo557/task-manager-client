import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../components/Layout/_contexts/authcontext";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

const LoggedInWrapper: React.FC = ({ children }: Props) => {
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
