import React, { useRef, useState, useEffect } from "react";
import { User, AuthType } from "@/lib/utils/types";
import Image from "next/image";
import { Button } from "@/components/base-components/button/button";
import { message, Spin, Progress, Avatar } from "antd";
import { updateUserById } from "@/lib/queries/user";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

type Props = {
  user: User | undefined;
  theme?: string;
};

const ProfileDetails = ({ user, theme }: Props) => {
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState(user?.username);
  const [bio, setBio] = useState(user?.bio);
  const [imageUpload, setImageUpload] = useState<File | any>("");
  const [imageURL, setImageURL] = useState<string | any>("");
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { dispatch, isUserActionDispatched, handleSetUser } =
    useAuth() as AuthType;

  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleImageUpload = async () => {
    setLoading(true);
    if (!imageUpload) {
      message.error("Please select an image");
      setLoading(false);
      return;
    }
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `profileimage/${imageUpload.name + "_" + uuidv4()}`
    );
    const uploadTask = uploadBytesResumable(storageRef, imageUpload);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressPercent(progress);
        message.info(`Uploading ${progress}%`);
        setImageUpload(null);
      },
      (error) => {
        message.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
          message.success("Image uploaded successfully");
          if (downloadURL) {
            const updatedUser = updateUserById(user?.userid, {
              profileImage: downloadURL,
            }) as any;

            if (updatedUser.status === "error") {
              message.error(updatedUser.message);
              setLoading(false);
            } else {
              if (updatedUser.status === "success") {
                message.success("Profile image added successfully");
                setLoading(false);
                dispatch({
                  type: "UPDATE_USER",
                  payload: true,
                });
                handleSetUser(updatedUser.user);
              }
              setImageURL("");
            }
          }
        });
      }
    );
  };

  useEffect(() => {
    setBio(user?.bio);
    setUsername(user?.username);
    setImageURL(user?.profileImage);
    return () => {
      setBio("");
      setUsername("");
      setImageURL("");
      dispatch({
        type: "UPDATE_USER",
        payload: false,
      });
    };
  }, [user, isUserActionDispatched]);
  return (
    <div
      className={`p-4 flex flex-col gap-4 rounded-md golos-font ${
        theme === "light"
          ? "bg-task-light-white text-task-dark"
          : "bg-task-sidebar-light-dark text-task-light-white"
      }`}>
      <div className={`text-lg font-medium`}>Profile Details</div>
      <div className={`flex flex-row items-center gap-5`}>
        <Avatar
          size={{ xs: 120, sm: 38, md: 40, lg: 64, xl: 80, xxl: 100 }}
          src={imageURL ? imageURL : user?.profileImage}
          className={` rounded-lg`}
        />

        <div className={`flex flex-row items-center `}>
          <input
            className={`font-light text-sm `}
            type="file"
            name="image"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={(e) => {
              setImageUpload(e.target.files && e.target.files[0]);
            }}
          />
        </div>

        <div>
          <div className={`flex flex-row items-center gap-5`}>
            {!imageUpload ? (
              <Button
                label="Change"
                size="xs"
                onClick={() => inputRef.current?.click()}
              />
            ) : (
              <Button label={"Upload"} size="xs" onClick={handleImageUpload} />
            )}
            <Button
              label="Delete"
              size="xs"
              bgColor="other"
              onClick={() => setImageUpload(null)}
            />
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

      <div
        className={`flex flex-row items-center gap-5 profile-details-inputs-container`}>
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
              className={`text-sm golos-font font-medium p-1 w-80 rounded-sm shadow-sm profile-details-input
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
            className={`text-sm golos-font font-medium p-1 w-80 rounded-sm shadow-sm profile-details-input ${
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
