import PageLayout from "@/components/Layout/pagelayout";
import { Button } from "@/components/base-components/button/button";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  useEmailValidate,
  usePasswordValidate,
} from "@/lib/hooks/useFormValidation";
import { useAuth } from "@/lib/hooks/useAuth";

const LoginForm: NextPage<LoginFormProps> = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [emailinput, setEmail] = useState<string | null>("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const { signIn, setUser } = useAuth();

  const { errorMessage: emailErrorMessage, validate: validateEmail } =
    useEmailValidate();
  const { errorMessage: passwordErrorMessage, validate: validatePassword } =
    usePasswordValidate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmailValid = validateEmail(emailinput);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      const response = await signIn(emailinput, password);
      if (response.status === "error") {
        setLoginError(response.message);
      } else if (response.status === "success") {
        setUser(response.user);
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (!email) {
  //     router.push("/login");
  //     return;
  //   }
  //   setLoading(false);
  // }, [email]);
  // if (loading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex flex-col w-2/5 gap-3">
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

        <form className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-3">
            <input
              className="golos-font text-base p-3 w-full border-[1.5px] border-gray-200 focus:outline focus:outline-[1px] focus:outline-task-blue rounded-xl"
              placeholder="Email"
              value={emailinput}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              {passwordErrorMessage && (
                <div className="golos-font text-red-400 text-sm font-normal">
                  {passwordErrorMessage}
                </div>
              )}
            </div>
          </div>
          <div className="w-full">
            <Button label="Continue" onClick={handleLogin} />
          </div>
        </form>
      </div>
    </div>
  );
};

LoginForm.getLayout = (page) => {
  return <PageLayout>{page}</PageLayout>;
};

export default LoginForm;
