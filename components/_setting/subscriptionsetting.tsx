import Image from "next/image";
import { Button } from "@/components/base-components/button/button";
import { User } from "@/lib/utils/types";
import { formatDate } from "@/lib/utils/util";
import { SubscriptionDetails } from "@/components/_setting/subscription/subscriptiondetails";
import { ReceiptHistory } from "@/components/_setting/subscription/receipthistory";

type Props = {
  user: User | undefined;
  theme?: string;
};

export const SubscriptionSetting = ({ user, theme }: Props) => {
  return (
    <div className="flex flex-col gap-6 pt-5">
      <div className="inline-flex flex-col gap-6">
        <SubscriptionDetails user={user} theme={theme} />
        <ReceiptHistory theme={theme} />
        <div className="inline-flex flex-col gap-6"></div>
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
