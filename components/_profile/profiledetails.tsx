import React, { useState, useEffect } from "react";
import { User, AuthType } from "@/lib/utils/types";
import Image from "next/image";
import { Button } from "@/components/base-components/button/button";
import { message, Spin } from "antd";
import { updateUserById } from "@/lib/queries/user";
import { useAuth } from "@/lib/hooks/useAuth";

type Props = {
  user: User | undefined;
  theme?: string;
};

const ProfileDetails = ({ user, theme }: Props) => {
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState(user?.username);
  const [bio, setBio] = useState(user?.bio);
  const [loading, setLoading] = useState(false);
  const { dispatch, isUserActionDispatched, handleSetUser } =
    useAuth() as AuthType;

  const handleInput = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "bio":
        setBio(value);
        break;
      default:
        break;
    }
  };

  const handleUpdate = async () => {
    setLoading(true);

    if (!username || !bio) {
      // message.error("Please fill all fields");
      setLoading(false);
      if (!username) {
        message.error("Please fill username field");
      } else if (!bio) {
        message.error("Please fill bio field");
      }
      return;
    }

    const updatedUser = await updateUserById(user?.userid, {
      username,
      bio,
    });

    if (updatedUser.status === "error") {
      message.error(updatedUser.message);
      setLoading(false);
    } else {
      if (updatedUser.status === "success") {
        message.success("Profile updated successfully");
        setLoading(false);
        dispatch({
          type: "UPDATE_USER",
          payload: true,
        });
        handleSetUser(updatedUser.user);
      }
    }
  };

  useEffect(() => {
    setBio(user?.bio);
    setUsername(user?.username);
  }, [user]);
  return (
    <div
      className={`p-4 flex flex-col gap-4 rounded-md golos-font ${
        theme === "light"
          ? "bg-task-light-white text-task-dark"
          : "bg-task-sidebar-light-dark text-task-light-white"
      }`}>
      <div className={`text-lg font-medium`}>Profile Details</div>
      <div className={`flex flex-row items-center gap-5`}>
        <Image
          // src={`/static/images/${props.user.profileImage}`}
          src="/static/images/logo.png"
          alt="profile image"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <div className={`flex flex-row items-center gap-5`}>
            <Button label="Upload Profile Photo" size="xs" />
            <Button label="Delete" size="xs" bgColor="other" />
          </div>

          <div
            className={`text-xs mt-3
          ${theme === "light" ? "text-neutral-700" : "text-neutral-300"}
          `}>
            *Image size should be at least 320px big, and less than 500kb.
            Allowed files .jpg and .png
          </div>
        </div>
      </div>

      <div className={`flex flex-row items-center gap-5`}>
        <div className={`flex flex-col`}>
          <label
            htmlFor="username"
            className={`text-sm golos-font font-medium
            ${theme === "light" ? "text-neutral-500" : "text-neutral-200"}
            `}>
            Username
          </label>
          <div className={`flex flex-row items-center`}>
            <div
              className={`text-sm golos-font font-medium p-1 rounded-sm
            ${
              theme === "light"
                ? "text-neutral-500 border-[0.4px] border-neutral-400"
                : "text-neutral-200 border-[0.4px] border-task-light-white"
            }
            `}>
              tassker.io/
            </div>
            <input
              type="text"
              required
              name="username"
              value={username}
              onChange={handleInput}
              className={`text-sm golos-font font-medium p-1 w-80 rounded-sm shadow-sm
            ${
              theme === "light"
                ? "text-neutral-500 bg-white border-[0.7px] border-neutral-500 outline-[0.6px] focus:outline-neutral-400"
                : "text-neutral-200 bg-task-sidebar-light-dark border-[0.6px] border-task-light-white focus:outline-neutral-600"
            }`}
            />
          </div>
        </div>

        <div className={`flex flex-col`}>
          <label
            htmlFor="email"
            className={`text-sm golos-font font-medium ${
              theme === "light" ? "text-neutral-500" : "text-neutral-200"
            }`}>
            Email address
          </label>
          <input
            type="text"
            name="email"
            value={user?.email}
            className={`text-sm golos-font font-medium p-1 w-80 rounded-sm shadow-sm ${
              theme === "light"
                ? "text-neutral-500 bg-white border-[0.7px] border-neutral-400 outline-[0.6px] focus:outline-neutral-400"
                : "text-neutral-200 bg-task-sidebar-light-dark border-[0.6px] border-task-light-white focus:outline-neutral-600"
            }`}
          />
        </div>
      </div>

      <div>
        <div className={`flex flex-col gap-2`}>
          <label
            htmlFor="about"
            className={`text-sm golos-font font-medium
            ${theme === "light" ? "text-neutral-500" : "text-neutral-200"}
            `}>
            Bio
          </label>
          <div>
            <textarea
              name="bio"
              id=""
              required
              cols={80}
              value={bio}
              onChange={handleInput}
              className={`w-full h-24 p-3 rounded-sm border-[0.5px] golos-font text-sm font-light resize-none shadow-sm
              ${
                theme === "light"
                  ? "bg-white border-[0.8px] border-neutral-400 outline-[0.6px] focus:outline-neutral-400"
                  : "text-neutral-200 bg-task-sidebar-light-dark border-[0.6px] border-task-light-white focus:outline-neutral-600"
              }
            `}></textarea>

            <div
              className={`text-xs golos-font font-normal
          ${theme === "light" ? "text-neutral-500" : "text-neutral-300"}
          `}>
              *Brief description for your profile. URLs are hyperlinked.
            </div>
          </div>
        </div>
      </div>

      <div className={`flex flex-row gap-4 mt-4 justify-end`}>
        <Button label="Cancel" size="sm" bgColor="other" />
        <Button
          label={loading ? <Spin size="small" /> : "Save"}
          size="sm"
          onClick={handleUpdate}
        />
      </div>
    </div>
  );
};

export default ProfileDetails;
