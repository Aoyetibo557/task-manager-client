import PageLayout from "@/components/Layout/layout";
import { Button } from "@/components/base-components/button/button";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  useEmailValidate,
  usePasswordValidate,
} from "@/lib/hooks/useFormValidation";
import { useAuth } from "@/lib/hooks/useAuth";
import { Spin } from "antd";
import { AuthType } from "@/lib/utils/types";
import { NextPage } from "next/types";
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [emailinput, setEmail] = useState<string | any>("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const { signIn, setUser } = useAuth() as AuthType;

  const { errorMessage: emailErrorMessage, validate: validateEmail } =
    useEmailValidate();
  const { errorMessage: passwordErrorMessage, validate: validatePassword } =
    usePasswordValidate() as any;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setLoginError("");

    const isEmailValid = validateEmail(emailinput as any);
    const isPasswordValid = validatePassword(password as any);

    if (!isEmailValid || !isPasswordValid) {
      setLoading(false);
      setLoginError("Please enter valid email and password");
      return;
    }

    try {
      const response = (await signIn(
        emailinput.toLowerCase(),
        password
      )) as any;
      if (response.status === "error") {
        setLoginError(response.message);
        setLoading(false);
      } else if (response.status === "success") {
        setLoading(true);
        setLoginError("");
        setUser(response.user);
        router.push("/dashboard");
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex flex-col items-center gap-3 w-full">
        <div className="font-bold text-2xl golos-font">
          Login to your account.
        </div>
        <div className="font-light text-normal golos-font">
          Enter your email and password to continue.
        </div>
        <div>
          {loginError && (
            <div className="golos-font text-red-400 text-sm font-normal">
              {loginError}
            </div>
          )}
        </div>

        <form className="flex flex-col gap-4 w-2/5 loginform">
          <div className="flex flex-col gap-3">
            <input
              className="golos-font text-base p-3 border-[1.5px] border-gray-200 focus:outline focus:outline-[1px] focus:outline-task-blue rounded-xl"
              placeholder="Email"
              name="email"
              value={emailinput}
              required
              onChange={handleInput}
            />
            <div>
              {emailErrorMessage && (
                <div className="golos-font text-red-400 text-sm font-normal">
                  {emailErrorMessage}
                </div>
              )}
            </div>

            <input
              className="golos-font text-base p-3 w-full border-[1.5px] border-gray-200 focus:outline focus:outline-[1px] focus:outline-task-blue rounded-xl"
              placeholder="Password"
              name="password"
              value={password}
              required
              onChange={handleInput}
            />
            <div>
              {passwordErrorMessage && (
                <div className="golos-font text-red-400 text-sm font-normal">
                  {passwordErrorMessage}
                </div>
              )}
            </div>
          </div>
          {/* <div>
            <Link
              href="/passwordreset"
              className="golos-font text-sm text-task-blue hover:underline font-normal inline-flex place-content-end">
              Forgot Password?
            </Link>
          </div> */}
          <div className="w-full">
            {loading ? (
              <Spin size="large" />
            ) : (
              <Button label={"Login"} onClick={handleLogin} />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

LoginForm.getLayout = (page: React.ReactNode) => {
  return <PageLayout>{page}</PageLayout>;
};

export default LoginForm;
