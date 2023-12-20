import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  selectUser,
  selectUserIsLoggedIn,
  selectUserLoading,
  checkUserLoggedIn,
} from "@/redux/features/auth-slice";
import apiService from "@/redux/apiService";

type Props = {
  children: React.ReactNode;
  theme?: string;
};

const LoggedInWrapper = ({ children }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const loadingUser = useSelector(selectUserLoading);
  const { initializeAppData } = apiService();

  useEffect(() => {
    dispatch(checkUserLoggedIn());
    if (!isLoggedIn && !loadingUser) {
      router.push("/loginform");
    }

    // initializeAppData();
  }, [isLoggedIn, loadingUser]);
  return <>{children}</>;
};

export default LoggedInWrapper;
