import PageLayout from "@/components/Layout/layout";
import { Button } from "@/components/base-components/button/button";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { handleLocationPermission, detectDeviceType } from "@/lib/scripts/_e";
import {
  useEmailValidate,
  usePasswordValidate,
} from "@/lib/hooks/useFormValidation";
import { Spin, message } from "antd";
import { AuthType } from "@/lib/utils/types";
import { NextPage } from "next/types";
import { signIn } from "@/lib/queries/user";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  setUser,
  setError,
  setToken,
  selectUser,
  selectUserError,
} from "@/redux/features/auth-slice";

const LoginForm = () => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const loginError = useSelector(selectUserError);
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);
  const [emailinput, setEmail] = useState<string | any>(user.email || "");
  const [password, setPassword] = useState("");

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
    const isEmailValid = validateEmail(emailinput as any);
    const isPasswordValid = validatePassword(password as any);

    if (!isEmailValid || !isPasswordValid) {
      setLoading(false);
      dispatch(setError("Please enter valid email and password"));
      return;
    }

    try {
      const response = (await signIn(
        emailinput.toLowerCase(),
        password
      )) as any;
      console.log(response);
      if (response.status === "error") {
        dispatch(setError(response.message));
      } else if (response.status === "success") {
        setLoading(true);
        dispatch(setError(""));
        dispatch(setUser(response.user));
        dispatch(setToken(response.token));
        router.push("/dashboard");
      }
    } catch (error: any) {
      message.error(error.message);
      setLoading(false);
    } finally {
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="flex flex-col gap-4 w-2/5 loginform">
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
              type="password"
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

          <div className="flex flex-row w-full">
            {loading && !user ? (
              <Spin size="large" className="w-full bg-transparent" />
            ) : (
              <Button
                label={"Login"}
                theme="light"
                onClick={handleLogin}
                className="w-full"
                bgColor="secondary"
              />
            )}
          </div>

          <div>
            <Link
              href="/signup"
              className="golos-font text-sm text-task-blue hover:underline font-normal inline-flex place-content-end">
              Create an account?
            </Link>
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
