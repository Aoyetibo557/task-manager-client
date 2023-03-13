import type { NextPage } from "next/types";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useAuth } from "@/lib/hooks/useAuth";
import { AuthType } from "@/lib/utils/types";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => {
  const router = useRouter();
  const { user, loading, isLoggedIn } = useAuth() as AuthType;

  useEffect(() => {
    // if (!loading) {
    //   if (user && isLoggedIn) router.push("/dashboard");
    //   else router.push("/login");
    // }

    router.push("/login");
  }, []);

  return;
};

export default Home;
