import Image from "next/image";
import { Button } from "@/components/base-components/button/button";
import { User } from "@/lib/utils/types";
import { formatDate } from "@/lib/utils/truncate";
import ProfileDetails from "@/components/_profile/profiledetails";
import { PasswordReset } from "@/components/_setting/passwordreset";
import { CloseAccount } from "@/components/_setting/closeaccount";

type Props = {
  user: User | undefined;
  theme?: string;
};

export const AccountSetting = ({ user, theme }: Props) => {
  return (
    <div className="flex flex-col gap-6 pt-5">
      <div className="inline-flex flex-row gap-6 mobile-account-setting">
        <ProfileDetails user={user} theme={theme} />

        <div className="inline-flex flex-col gap-6">
          <PasswordReset theme={theme} />
          <CloseAccount theme={theme} />
        </div>
      </div>

      <div
        className={`border-t-[0.5px]
        ${theme === "light" ? "border-neutral-400" : "border-neutral-600"}
      `}>
        <div
          className={`text-sm golos-font font-normal mt-5
          ${theme === "light" ? "text-neutral-500" : "text-neutral-400"}
          `}>
          This account was created on {formatDate(user?.timestamp)}
        </div>
      </div>
    </div>
  );
};
