import type { NextPage } from "next/types";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useAuth } from "@/lib/hooks/useAuth";
import { AuthType } from "@/lib/utils/types";
import LandingHeader from "@/components/Layout/Header/landingheader";
import Footer from "@/components/Layout/Footer/footer";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const router = useRouter();
  const { user, loading, isLoggedIn } = useAuth() as AuthType;

  useEffect(() => {
    // if (!loading) {
    //   if (user && isLoggedIn) router.push("/dashboard");
    //   else router.push("/login");
    // }
    // router.push("/login");
  }, []);

  return (
    <div className={`w-full`}>
      <LandingHeader />
      <div
        className={`mt-8 p-10 flex flex-row items-center justify-center gap-48 landingpage-container`}>
        <div className={`flex flex-col gap-10 w-2/6 landingpage-textcontainer`}>
          <div
            className={`flex flex-col golos-font font-extrabold text-[3.5rem]`}>
            <span> Make </span>
            <span>Tasking fun again</span>
          </div>

          <div className={`golos-font text-lg text-neutral-700`}>
            Get yourself in sync, no matter your location. Streamline processes,
            create boards, and tasks and watch your productivity soar.
          </div>

          <Link
            href="/loginform"
            aria-label="Learn More Button"
            className={`w-44 text-center golos-font text-base font-normal p-2 rounded-md bg-blue-500 text-white hover:bg-blue-700`}>
            Learn more
          </Link>

          <div
            className={`flex flex-row items-center justify-between logo-container`}>
            <Image
              src={"/static/images/clientaudiophile.svg"}
              width={70}
              height={70}
              className={``}
              alt={"Audophile Logo"}
            />

            <Image
              src={"/static/images/clientdatabiz.svg"}
              width={90}
              height={90}
              className={``}
              alt={"Databiz Logo"}
            />

            <Image
              src={"/static/images/clientmaker.svg"}
              width={90}
              height={90}
              className={``}
              alt={"Maker Logo"}
            />

            <Image
              src={"/static/images/clientmeet.svg"}
              width={90}
              height={90}
              className={``}
              alt={"Meet Logo"}
            />
          </div>
        </div>

        <div>
          <Image
            src={"/static/images/herodesktop.png"}
            width={430}
            height={430}
            aria-label="Langing Page Image"
            className={`h-max`}
            alt={"Landing page Image: Man holding a laptop"}
          />
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Home;
