import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { AccountSetting } from "@/components/_setting/accountsetting";
import { SubscriptionSetting } from "@/components/_setting/subscriptionsetting";
import { getUserDetails } from "@/lib/queries/user";
import { message } from "antd";
import { User, AuthType } from "@/lib/utils/types";
import dayjs from "dayjs";
import { useAuth } from "@/lib/hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { selectUser } from "@/redux/features/auth-slice";

type Props = {
  children?: React.ReactNode;
  theme?: string;
};

export const SettingsTab = (props: Props) => {
  const [userDetails, setStateUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const { dispatch, isUserActionDispatched, setUser } = useAuth() as AuthType;
  const user = useSelector(selectUser);
  const tabs = [
    {
      name: "General settings",
      content: (
        <div>
          <AccountSetting user theme={props.theme} />
        </div>
      ),
    },
    {
      name: "Subscription",
      content: (
        <div>
          <SubscriptionSetting user theme={props.theme} />
        </div>
      ),
    },
  ];

  // get the user deailts with the id
  // const handleUserProfile = async () => {
  //   const res = await getUserDetails(props?.userId);
  //   if (res.status === "error") {
  //     message.error(`Something went wrong!  ${res.message}`);
  //   } else {
  //     if (res.status === "success") {
  //       setStateUser(res?.user);
  //       return res.user;
  //     }
  //   }
  // };
  useEffect(() => {
    try {
      if (props?.userId.length < 0) {
        setLoading(true);
      } else {
        setLoading(false);
      }

      if (isUserActionDispatched) {
        handleUserProfile();
      }

      return () => {
        dispatch({ type: "UPDATE_USER", payload: false });
      };
    } catch (error: any) {
      console.log(error.message);
    }
  }, [props.userId]);

  return (
    <Tab.Group>
      <Tab.List className="flex p-1 space-x-10 border-b-[0.6px] border-neutral-600">
        {tabs.map((tab, index) => (
          <Tab
            className={`text-base golos-font font-medium p-2
        ${
          props.theme === "light"
            ? "text-task-sidebar-dark hover:bg-gray-200"
            : "text-neutral-300"
        }`}
            key={`tab-${index} `}>
            {tab.name}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {tabs.map((tab, index) => (
          <Tab.Panel key={`tab-panel-${index}`}>{tab.content}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
