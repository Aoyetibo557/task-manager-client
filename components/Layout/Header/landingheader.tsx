import React, { useState, useEffect } from "react";
import Link from "next/link";

const LandingHeader = () => {
  return (
    <div className={`flex flex-row items-center justify-between p-8`}>
      <div>
        <Link
          href="/"
          className={`bebas-neue-font text-4xl text-blue-700 font-extrabold`}>
          {" "}
          Tassker
        </Link>
        <div>{/* Possible Links */}</div>
      </div>
      <div className={`flex flex-row items-center gap-10 landingheader-menu`}>
        <Link
          href="/login"
          title="Login"
          aria-label="Login"
          className={`golos-font text-base font-medium hover:scale-110 hover:underline hover:underline-offset-8 hover:text-blue-500 p-1`}>
          Login
        </Link>
        <Link
          href="/signup"
          title="Register"
          aria-label="Create an Account"
          className={`border-[1.5px] border-blue-800 p-1 w-28 text-center rounded-lg golos-font text-base font-normal hover:bg-blue-500 hover:text-white hover:border-none`}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingHeader;
