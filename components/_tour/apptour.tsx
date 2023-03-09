import React, { useRef, useState } from "react";
import { Tour, message } from "antd";
import type { TourProps } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { Button } from "../base-components/button/button";
import { updateUserById } from "@/lib/queries/user";
import { useAuth } from "@/lib/hooks/useAuth";
import { AuthType } from "@/lib/utils/types";

const AppTour = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const { user } = useAuth() as AuthType;

  const [open, setOpen] = useState<boolean>(false);
  const [isTourTaken, setIsTourTaken] = useState<boolean>(false);

  const steps: TourProps["steps"] = [
    {
      title: "Create a new board",
      description: "Use this button to create a new board.",
      target:
        typeof document !== "undefined" &&
        (document.querySelector("#create-board") as any),
    },
    {
      title: "Toggle Theme",
      description:
        "Use this button to toggle the theme between light and dark.",
      target:
        typeof document !== "undefined" &&
        (document.querySelector("#toggle-theme") as any),
    },
    {
      title: "Dropdown Menu",
      description: "Click to see menu options.",
      target:
        typeof document !== "undefined" &&
        (document.querySelector("#menu") as any),
    },
  ];

  const onCloseHandler = () => {
    setIsTourTaken(true);
    setOpen(false);
  };

  const handleTourComplete = async () => {
    const data = await updateUserById(user?.userid, {
      tourtaken: true,
    });
    if (data.status === "success") {
      setOpen(false);
      return;
    } else {
      console.log("Error:", data);
      setOpen(false);
    }
  };

  return (
    <div className={``}>
      <Button label="Begin Tour" size="sm" onClick={() => setOpen(true)} />
      <Tour
        steps={steps}
        type="primary"
        open={open}
        // onMaskClick={() => setOpen(false)}
        onClose={onCloseHandler}
        onFinish={handleTourComplete}
      />
    </div>
  );
};

export default AppTour;
