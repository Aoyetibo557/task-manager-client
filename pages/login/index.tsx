import PageLayout from "@/components/Layout/layout";
import { Button } from "@/components/base-components/button/button";
import { useAuth } from "@/lib/hooks/useAuth";
import { useState } from "react";
import { useRouter } from "next/router";
import { Spin } from "antd";
import { AuthType } from "@/lib/utils/types";

const Login = () => {
  const { findUserByEmail } = useAuth() as AuthType;
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = (await findUserByEmail(email)) as any;
      const { user } = response;
      if (response.status === "success") {
        setLoading(false);
        router.push(`/loginform?email=${user?.email}`);
      } else if (response.status === "error") {
        setLoading(false);
        router.push("/signup");
      }
    } catch (error: any) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 p-4">
      <div className="flex flex-col gap-4 ">
        <div>
          <div className="font-bold text-2xl golos-font">
            Welcome to Tasskker
          </div>
          <div className="font-light text-normal golos-font">
            Sign in or create an account by entering your email address below
          </div>

          <div>{error && <div className="text-red-500">{error}</div>}</div>
        </div>
        <div>
          <input
            className="golos-font text-base p-3 w-full border-[1.5px] border-gray-200 focus:outline focus:outline-[1px] focus:outline-task-blue rounded-xl"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full">
          {loading ? (
            <Spin size="large" />
          ) : (
            <Button label="Continue" onClick={handleLogin} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

Login.getLayout = (page: React.ReactNode) => {
  return <PageLayout>{page}</PageLayout>;
};
