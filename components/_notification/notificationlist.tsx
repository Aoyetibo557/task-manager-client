import React, { useEffect, useState, useContext } from "react";
import { Notification } from "@/lib/utils/types";
import { getUserNotifications } from "@/lib/queries/notification.ts";
import { useAuth } from "@/lib/hooks/useAuth";
import { AuthType } from "@/lib/utils/types";
import NotificationCard from "./notificationcard/notificationcard";
import { ThemeContext } from "@/components/Layout/_contexts/themecontext";
import { message, Spin } from "antd";

const localstorage = typeof window !== "undefined" ? localStorage : null;

function NotificationList({ notifications }: props) {
  const { user } = useAuth() as AuthType;
  const { theme } = useContext(ThemeContext);
  const [stateNotifications, setStateNotifications] = useState<Notification[]>(
    []
  );
  // get the userid from the localstorage
  const localuser = localstorage?.getItem("task-user");
  const userid = localuser ? JSON.parse(localuser).userid : null;

  const [loading, setLoading] = useState(false);

  const handleGetNotifications = async () => {
    setLoading(true);
    try {
      const res = await getUserNotifications(user.userid || userid);
      if (res.status === "success") {
        setStateNotifications(res?.notifications);
      } else {
        message.error(res.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetNotifications();
  }, [user]);

  return (
    <div className={`p-5`}>
      <div
        className={`text-4xl h-20  golos-font ${
          theme === "light" ? "text-task-dark" : "text-task-light-white"
        }`}>
        Notifications
      </div>

      <div>
        <div className={`flex items-center justify-center `}>
          {loading && <Spin size="large" className={`h-32`} />}
        </div>
        {stateNotifications.map((notification, idx) => (
          <NotificationCard
            notification={notification}
            theme={theme}
            key={notification.id || idx}
          />
        ))}
      </div>
    </div>
  );
}

export default NotificationList;
