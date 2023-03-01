import PageLayout from "@/components/Layout/pagelayout";
import { Button } from "@/components/base-components/button/button";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  useEmailValidate,
  usePasswordValidate,
} from "@/lib/hooks/useFormValidation";
import { useAuth } from "@/lib/hooks/useAuth";

const Signup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState<string | null>("");
  const [lastName, setLastName] = useState<string | null>("");
  const [emailinput, setEmail] = useState<string | null>("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState<string | null>(null);
  const [checkbox, setCheckbox] = useState(false);

  const { signUp } = useAuth();

  const { errorMessage: emailErrorMessage, validate: validateEmail } =
    useEmailValidate();
  const { errorMessage: passwordErrorMessage, validate: validatePassword } =
    usePasswordValidate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmailValid = validateEmail(emailinput);
    const isPasswordValid = validatePassword(password);
    const passwordMatch = password === confirmPassword;
    if (!isEmailValid || !isPasswordValid || !passwordMatch) {
      return;
    }

    try {
      const response = await signUp(emailinput, password, firstName, lastName);
      console.log("Response", response);
      if (response.status === "error") {
        setSignupError(response.message);
      } else if (response.status === "success") {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className="flex flex-row gap-3">
            <input
              className="golos-font text-base p-3 w-full border-[1.5px] border-gray-200 focus:outline focus:outline-[1px] focus:outline-task-blue rounded-xl"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="golos-font text-base p-3 w-full border-[1.5px] border-gray-200 focus:outline focus:outline-[1px] focus:outline-task-blue rounded-xl"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <input
              className="golos-font text-base p-3 w-full border-[1.5px] border-gray-200 focus:outline focus:outline-[1px] focus:outline-task-blue rounded-xl"
              placeholder="Email"
              value={emailinput}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="golos-font text-base p-3 w-full border-[1.5px] border-gray-200 focus:outline focus:outline-[1px] focus:outline-task-blue rounded-xl"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              className="golos-font text-base p-3 w-full border-[1.5px] border-gray-200 focus:outline focus:outline-[1px] focus:outline-task-blue rounded-xl"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="text-sm font-medium border-b-[0.8px] border-neutral-300 pb-4">
              Password must contain at least 8 characters, including 1 uppercase
              letter, 1 lowercase letter, 1 special character, and 1 number
            </div>

            <div className="flex flex-row gap-3">
              <input
                type="checkbox"
                className="w-5 h-5 border-[1.5px] border-gray-200 focus:outline focus:outline-[1px] focus:outline-task-blue rounded-xl"
                value={checkbox}
                onChange={(e) => setCheckbox(e.target.checked)}
              />
              <div className="font-light text-normal golos-font">
                I have read and agree to the Terms of Service and Privacy Policy
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button label="Continue" onClick={handleSignup} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Signup.getLayout = (page) => {
  return <PageLayout>{page}</PageLayout>;
};
export default Signup;
