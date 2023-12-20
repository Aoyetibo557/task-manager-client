import PageLayout from "@/components/Layout/layout";
import { Button } from "@/components/base-components/button/button";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  useEmailValidate,
  usePasswordValidate,
} from "@/lib/hooks/useFormValidation";
import { signUp } from "@/lib/queries/user";
import { Spin, message } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  setUser,
  setLoading,
  setError,
  selectUserError,
  selectUserLoading,
} from "@/redux/features/auth-slice";

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectUserLoading);
  const signupError = useSelector(selectUserError);

  const [firstName, setFirstName] = useState<string | any>("");
  const [lastName, setLastName] = useState<string | any>("");
  const [emailinput, setEmail] = useState<string | any>("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkbox, setCheckbox] = useState<boolean | any>(false);

  const { errorMessage: emailErrorMessage, validate: validateEmail } =
    useEmailValidate();
  const { errorMessage: passwordErrorMessage, validate: validatePassword } =
    usePasswordValidate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.target;
    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else if (name === "checkbox") {
      setCheckbox(!checkbox);
    }
  };

  const handleSignup = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const isEmailValid = validateEmail(emailinput as any);
    const isPasswordValid = validatePassword(password as any);
    const passwordMatch = password === confirmPassword;

    if (!isEmailValid || !isPasswordValid || !passwordMatch) {
      if (!isEmailValid) {
        dispatch(setError(emailErrorMessage));
      } else if (!isPasswordValid) {
        dispatch(setError(passwordErrorMessage));
      }
      setLoading(false);
      return;
    }

    if (!checkbox) {
      dispatch(setError("Please agree to the terms and conditions"));
      dispatch(setLoading(false));
      return;
    }

    if (
      !firstName ||
      !lastName ||
      !emailinput ||
      !password ||
      !confirmPassword
    ) {
      dispatch(setError("Please fill in all fields"));
      dispatch(setLoading(false));
      return;
    }

    try {
      const response = (await signUp(
        emailinput,
        password,
        firstName,
        lastName
      )) as any;

      if (response.status === "error") {
        dispatch(setError(response.message));
        dispatch(setLoading(false));
      } else if (response.status === "success") {
        dispatch(setUser(response.user));
        router.push("/dashboard");
        dispatch(setLoading(false));
      }
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

  useEffect(() => {
    /**
     * this is needed because the initail state for the loading that it is sharing is set to true,
     * If we change the initial state to false, then that affects the logic in loggedinwrapper.tsx
     * where it checks if the user is logged in or not.
     *  */
    dispatch(setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center mt-10">
        <div className="flex flex-col gap-3">
          <div className="font-bold text-2xl golos-font">Create An Account</div>
          <div className="font-light text-normal golos-font">
            Add your information and create a password below to get started.
          </div>
        </div>

        <div className="flex flex-col w-2/5 gap-3 mt-10">
          {signupError && (
            <div className="text-red-500 text-sm golos-font">{signupError}</div>
          )}
          <form className="flex flex-col gap-3">
            <div className="flex flex-row gap-3">
              <input
                className="golos-font text-base p-3 w-full border-[1.5px] border-gray-200 focus:outline focus:outline-[1px] focus:outline-task-blue rounded-xl"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                required
                onChange={handleInput}
              />
              <input
                className="golos-font text-base p-3 w-full border-[1.5px] border-gray-200 focus:outline focus:outline-[1px] focus:outline-task-blue rounded-xl"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                required
                onChange={handleInput}
              />
            </div>
            <div className="flex flex-col gap-3">
              <input
                className="golos-font text-base p-3 w-full border-[1.5px] border-gray-200 focus:outline focus:outline-[1px] focus:outline-task-blue rounded-xl"
                placeholder="Email"
                name="email"
                value={emailinput}
                required
                onChange={handleInput}
              />

              <input
                className="golos-font text-base p-3 w-full border-[1.5px] border-gray-200 focus:outline focus:outline-[1px] focus:outline-task-blue rounded-xl"
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={handleInput}
              />

              <input
                className="golos-font text-base p-3 w-full border-[1.5px] border-gray-200 focus:outline focus:outline-[1px] focus:outline-task-blue rounded-xl"
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                required
                onChange={handleInput}
              />
              <div className="text-sm font-medium border-b-[0.8px] border-neutral-300 pb-4">
                Password must contain at least 8 characters, including 1
                uppercase letter, 1 lowercase letter, 1 special character, and 1
                number
              </div>

              <div className="flex flex-row gap-3">
                <input
                  type="checkbox"
                  name="checkbox"
                  className="w-5 h-5 border-[1.5px] border-gray-200 focus:outline focus:outline-[1px] focus:outline-task-blue rounded-xl"
                  value={checkbox}
                  required
                  onChange={handleInput}
                />
                <div className="font-light text-sm golos-font">
                  I have read and agree to the Terms of Service and Privacy
                  Policy
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {loading ? (
                  <Spin size="large" />
                ) : (
                  <Button label="Continue" onClick={handleSignup} />
                )}
              </div>

              <div>
                <div className="font-light text-sm golos-font">
                  Already have an account?{" "}
                  <Link
                    href="/loginform"
                    className="text-task-blue hover:underline">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Signup.getLayout = (page: React.ReactNode) => {
  return <PageLayout>{page}</PageLayout>;
};
export default Signup;
