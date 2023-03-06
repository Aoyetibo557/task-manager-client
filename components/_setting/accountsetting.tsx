import Image from "next/image";
import { Button } from "@/components/base-components/button/button";
import { User } from "@/lib/utils/types";
import { formatDate } from "@/lib/utils/truncate";
import ProfileDetails from "@/components/_profile/profiledetails";

type Props = {
  user: User;
  theme?: string;
};

export const AccountSetting = ({ user, theme }: Props) => {
  return (
    <div className="flex flex-col gap-6 pt-5">
      <ProfileDetails user={user} theme={theme} />
      <div className={`flex flex-col space-y-4`}>
        <div>
          <div
            className={`text-lg golos-font font-medium
          ${
            theme === "light"
              ? "text-task-sidebar-dark"
              : "text-task-light-white"
          }
          `}>
            Profile
          </div>
          <div
            className={`text-sm golos-font font-normal
          ${theme === "light" ? "text-neutral-600" : "text-task-light-white"}
          `}>
            This information will be displayed publicly so be careful what you
            share.
          </div>
        </div>

        <div className={`flex flex-row gap-10 items-center`}>
          <div className={`flex flex-col`}>
            <label
              htmlFor="firstname"
              className={`text-sm golos-font font-medium
            ${theme === "light" ? "text-neutral-500" : "text-neutral-200"}
            `}>
              First name
            </label>
            <input
              type="text"
              name="firstname"
              value={user.firstName}
              className={`text-sm golos-font font-medium p-1 w-80 rounded-sm shadow-sm
            ${
              theme === "light"
                ? "text-neutral-500 bg-white border-[0.7px] border-neutral-400 outline-[0.3px] focus:outline-neutral-400"
                : "text-neutral-200 bg-task-sidebar-light-dark border-[0.6px] border-task-light-white focus:outline-neutral-600"
            }`}
            />
          </div>
          <div className={`flex flex-col`}>
            <label
              htmlFor="lastname"
              className={`text-sm golos-font font-medium
            ${theme === "light" ? "text-neutral-500" : "text-neutral-200"}
            `}>
              Last name
            </label>
            <input
              type="text"
              name="lastname"
              value={user.lastName}
              className={`text-sm golos-font font-medium p-1 w-80 rounded-sm shadow-sm
            ${
              theme === "light"
                ? "text-neutral-500 bg-white border-[0.7px] border-neutral-400 outline-[0.6px] focus:outline-neutral-400"
                : "text-neutral-200 bg-task-sidebar-light-dark border-[0.6px] border-task-light-white focus:outline-neutral-600"
            }`}
            />
          </div>
        </div>

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
              http://www.tassker.io/
            </div>
            <input
              type="text"
              name="username"
              value={user?.username}
              className={`text-sm golos-font font-medium p-1 w-80 rounded-sm shadow-sm
            ${
              theme === "light"
                ? "text-neutral-500 bg-white border-[0.7px] border-neutral-500 outline-[0.6px] focus:outline-neutral-400"
                : "text-neutral-200 bg-task-sidebar-light-dark border-[0.6px] border-task-light-white focus:outline-neutral-600"
            }`}
            />
          </div>
        </div>
      </div>

      <div className={`flex flex-col gap-4`}>
        <div className={`flex flex-col`}>
          <div
            className={`text-sm golos-font font-medium mb-2
          ${theme === "light" ? "text-neutral-500" : "text-neutral-200"}
          `}>
            Photo
          </div>
          <div className={`flex flex-row items-center gap-5`}>
            <Image
              src="/static/images/logo.png"
              width={50}
              height={50}
              className={`rounded-full`}
            />

            <Button label="Change" size="xs" />

            <Button label="Remove" size="xs" bgColor="other" />
          </div>
        </div>

        <div className={`flex flex-col gap-2`}>
          <label
            htmlFor="about"
            className={`text-sm golos-font font-medium
            ${theme === "light" ? "text-neutral-500" : "text-neutral-200"}
            `}>
            About
          </label>
          <div>
            <textarea
              name="about"
              id=""
              cols={80}
              value={user?.bio}
              className={`w-2/4 h-24 p-3 rounded-sm border-[0.4px] golos-font text-sm font-light resize-none shadow-sm
              ${
                theme === "light"
                  ? "bg-white border-[0.8px] border-neutral-500 outline-[0.6px] focus:outline-neutral-400"
                  : "bg-task-sidebar-dark text-task-light-white border-neutral-500 outline-[0.2px] focus:outline-neutral-800"
              }
            `}></textarea>

            <div
              className={`text-sm golos-font font-normal
          ${theme === "light" ? "text-neutral-600" : "text-task-light-white"}
          `}>
              Brief description for your profile. URLs are hyperlinked.
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div
            className={`text-lg golos-font font-medium
          ${
            theme === "light"
              ? "text-task-sidebar-dark"
              : "text-task-light-white"
          }
          `}>
            Personal Information
          </div>
          <div
            className={`text-sm golos-font font-normal
          ${theme === "light" ? "text-neutral-600" : "text-task-light-white"}
          `}>
            This information will be displayed publicly so be careful what you
            share.
          </div>
        </div>

        <div className={`mt-6 flex flex-col gap-6`}>
          <div className={`flex flex-row gap-6`}>
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
                value={user.email}
                className={`text-sm golos-font font-medium p-1 w-80 rounded-sm shadow-sm ${
                  theme === "light"
                    ? "text-neutral-500 bg-white border-[0.7px] border-neutral-400 outline-[0.6px] focus:outline-neutral-400"
                    : "text-neutral-200 bg-task-sidebar-light-dark border-[0.6px] border-task-light-white focus:outline-neutral-600"
                }`}
              />
            </div>

            <div className={`flex flex-col`}>
              <label
                htmlFor="phone"
                className={`text-sm golos-font font-medium
            ${theme === "light" ? "text-neutral-500" : "text-neutral-200"}
            `}>
                Phone number
              </label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                className={`text-sm golos-font font-medium p-1 w-80 rounded-sm shadow-sm
            ${
              theme === "light"
                ? "text-neutral-500 bg-white border-[0.7px] border-neutral-400 outline-[0.6px] focus:outline-neutral-400"
                : "text-neutral-200 bg-task-sidebar-light-dark border-[0.6px] border-task-light-white focus:outline-neutral-600"
            }`}
              />
            </div>
          </div>

          <div className={`flex flex-row gap-6`}>
            <div className={`flex flex-col`}>
              <label
                htmlFor="country"
                className={`text-sm golos-font font-medium
            ${theme === "light" ? "text-neutral-500" : "text-neutral-200"}
            `}>
                Country
              </label>
              <input
                type="text"
                name="country"
                value={user?.country}
                className={`text-sm golos-font font-medium p-1 w-80 rounded-sm shadow-sm
            ${
              theme === "light"
                ? "text-neutral-500 bg-white border-[0.7px] border-neutral-400 outline-[0.6px] focus:outline-neutral-400"
                : "text-neutral-200 bg-task-sidebar-light-dark border-[0.6px] border-task-light-white focus:outline-neutral-600"
            }`}
              />
            </div>

            <div className={`flex flex-col`}>
              <label
                htmlFor="language"
                className={`text-sm golos-font font-medium
            ${theme === "light" ? "text-neutral-500" : "text-neutral-200"}
            `}>
                Language
              </label>
              <input
                type="text"
                name="language"
                value={user?.language}
                className={`text-sm golos-font font-medium p-1 w-80 rounded-sm shadow-sm
            ${
              theme === "light"
                ? "text-neutral-500 bg-white border-[0.7px] border-neutral-400 outline-[0.6px] focus:outline-neutral-400"
                : "text-neutral-200 bg-task-sidebar-light-dark border-[0.6px] border-task-light-white focus:outline-neutral-600"
            }`}
              />
            </div>
          </div>
        </div>

        <div className={`border-b-[0.5px] border-neutral-300 pb-4`}>
          <div
            className={`text-sm golos-font font-normal mt-5
          ${theme === "light" ? "text-neutral-500" : "text-neutral-400"}
          `}>
            This account was created on {formatDate(user?.timestamp)}
          </div>
        </div>

        <div className={`flex flex-row gap-4 mt-4 justify-end`}>
          <Button label="Cancel" size="sm" bgColor="other" />
          <Button label="Save" size="sm" />
        </div>
      </div>
    </div>
  );
};
