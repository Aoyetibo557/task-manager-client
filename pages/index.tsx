import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useAuth } from "@/lib/hooks/useAuth";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => {
  const router = useRouter();
  const { user, loading, isLoggedIn } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user && isLoggedIn) router.push("/dashboard");
      else router.push("/login");
    }
  }, [user, loading, isLoggedIn]);

  return <div>Checking Sessions...</div>;
};

export default Home;
