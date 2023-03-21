import PageLayout from "@/components/Layout/layout";
import { Button } from "@/components/base-components/button/button";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const PasswordResetForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [emailinput, setEmail] = useState<string | any>("");

  return (
    <div className="flex flex-col items-center mt-10 gap-4">
      <div className="flex items-center flex-col mb-6">
        <div className="font-bold text-2xl golos-font">Reset Password</div>

        <div>
          <div className="golos-font text-red-400 text-sm font-normal">
            reset your password here and login to your account again.
          </div>
        </div>
      </div>
      <form className="flex flex-col gap-4 w-2/5 loginform">
        <input
          className="golos-font text-base p-3 border-[1.5px] border-gray-200 focus:outline focus:outline-[1px] focus:outline-task-blue rounded-xl"
          type="password"
          name="password"
          placeholder="Password"
        />
        <input
          className="golos-font text-base p-3 border-[1.5px] border-gray-200 focus:outline focus:outline-[1px] focus:outline-task-blue rounded-xl"
          type="password"
          name="password2"
          placeholder="Confirm Password"
        />
        <Button label="reset passowrd" size="sm" />
      </form>
    </div>
  );
};

PasswordResetForm.getLayout = (page: React.ReactNode) => {
  return <PageLayout>{page}</PageLayout>;
};

export default PasswordResetForm;
