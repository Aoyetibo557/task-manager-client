import { useState, Dispatch, useContext } from "react";
import { Button } from "../base-components/button/button";
import Modal from "../Utility/Modal/modal";
import { IoCloseCircleOutline } from "react-icons/io5";
import { AiOutlineExclamation } from "react-icons/ai";
import { ThemeContext } from "../Layout/_contexts/themecontext";
import { message } from "antd";
import { useAuth } from "@/lib/hooks/useAuth";
import { AuthType } from "@/lib/utils/types";
import { useEmailValidate } from "@/lib/hooks/useFormValidation";
import { findUserByEmail } from "@/lib/queries/user";
import { sendInvite } from "@/lib/queries/board";

type Props = {
  title: string;
  subtitle?: string;
  className?: string;
  loading?: boolean;
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  icon?: JSX.Element;
  boardId: string;
};

const InviteModal = (props: Props) => {
  const { theme } = useContext(ThemeContext);
  const [currentEmail, setCurrentEmail] = useState<string>("");
  const [emails, setEmails] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { errorMessage: emailErrorMessage, validate: validateEmail } =
    useEmailValidate();

  const { user } = useAuth() as AuthType;

  const handleAddEmail = async () => {
    setError(null);
    let isEmailValid = validateEmail(currentEmail as any);
    const response = (await findUserByEmail(currentEmail)) as any;
    let isEmailRegistered = response.status === "success" ? true : false;

    if (
      currentEmail &&
      emails.length < 5 &&
      isEmailValid &&
      !emails.includes(currentEmail) &&
      isEmailRegistered
    ) {
      setEmails([...emails, currentEmail]);
      setCurrentEmail("");
    } else {
      if (!isEmailValid) {
        message.error("Please enter a valid email address");
        setError("Please enter a valid email address");
      } else if (emails.includes(currentEmail)) {
        message.error("Email already added");
        setError("Email already added");
      } else if (!isEmailRegistered) {
        message.error("Email not registered");
        setError("Email not registered.You can only invite registered users");
      } else if (emails.length >= 5) {
        message.error("You can only invite 5 users");
        setError("You can only invite 5 users");
      }
    }
  };

  // take the emails and send email to each of them with a link to the app
  const handleSendInvite = async () => {
    const res = await sendInvite(props.boardId, emails, user.email);

    if (res.status === "success") {
      message.success("Invites sent successfully");
      props.setOpen(false);
    } else {
      message.error("Something went wrong");
    }
  };

  const handleRemoveEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  return (
    <Modal
      title={
        <div className="inline-flex flex-row mb-4 items-center w-full">
          <div>
            <Button
              label={<IoCloseCircleOutline className="w-5 h-5" />}
              onClick={() => props.setOpen(false)}
              bgColor="other"
              size="xs"
            />
          </div>

          <div
            className={`w-full flex flex-row items-center justify-center gap-2 golos-font  ${
              theme === "light" ? "text-neutral-900" : "text-neutral-100"
            }`}>
            {/* {props.icon || <AiOutlineExclamation className="w-5 h-5" />} */}
            <div className={`text-base font-semibold `}>{props.title}</div>
          </div>
        </div>
      }
      open={props.open}
      theme={theme}
      setOpen={props.setOpen}>
      <div
        className={`flex flex-col ${
          theme === "light" ? "text-neutral-500" : "text-neutral-400"
        }`}>
        <div className="flex flex-col items-center justify-center gap-6">
          <p
            className={`text-sm font-medium golos-font ${
              theme === "light" ? "text-neutral-500" : "text-neutral-400"
            }`}>
            {props.subtitle}
          </p>
        </div>

        <div className=" flex flex-col justify-between p-4 gap-4 mt-6">
          <div className="flex flex-col">
            {error && currentEmail.length > 0 && (
              <div className={`text-sm text-red-500`}>{error}</div>
            )}
          </div>
          <div className={``}>
            <div>
              {emailErrorMessage && currentEmail.length > 0 && (
                <div className={`text-sm text-red-500`}>
                  {emailErrorMessage}
                </div>
              )}
            </div>
            <div className={`mb-5`}>
              <input
                type="text"
                name="email"
                required
                placeholder="eg: pete@gmail.com"
                className={`w-full h-10 rounded-md border-[1.5px] px-4 border-blue-400  focus:border-blue-600 focus:outline-none
                ${
                  theme === "light"
                    ? "bg-task-light-white text-task-sidebar-dark"
                    : "bg-task-sidebar-dark text-task-light-white"
                }`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddEmail();
                    // e.target.value = "";
                  }
                }}
                onChange={(e) => setCurrentEmail(e.target.value)}
                value={currentEmail}
              />
            </div>

            <div className={`flex flex-col gap-1`}>
              {/* permissions for new users will be set here. Edditing Only, commenting Only, Full Privileges  */}
              <div
                className={`text-sm font-medium golos-font mb-4 ${
                  theme === "light" ? "text-neutral-600" : "text-neutral-100"
                }`}>
                Note: Permissions for new users will be set here. Edditing Only,
                commenting Only and Project Manager (Full Privileges)
              </div>

              <div className={`flex flex-row gap-2 flex-wrap mb-3`}>
                {emails.map((email, index) => (
                  <Button
                    key={index}
                    label={
                      <div className={`flex flex-row gap-2 items-center`}>
                        <div className={`text-sm`}>{email}</div>
                        <IoCloseCircleOutline
                          className="w-5 h-5"
                          onClick={() => handleRemoveEmail(index)}
                        />
                      </div>
                    }
                    // bgColor="other"
                    size="xs"
                  />
                ))}
              </div>
              <div className={`flex flex-row gap-2`}>
                <input
                  type="checkbox"
                  name="edit"
                  id="edit"
                  className={`w-4 h-4`}
                />
                <label
                  htmlFor="edit"
                  className={` text-sm golos-font ${
                    theme === "light" ? "text-neutral-900" : "text-neutral-100"
                  }`}>
                  Editor{" "}
                  <span
                    className={`${
                      theme === "light"
                        ? "text-neutral-500"
                        : "text-neutral-400"
                    }`}>
                    (can edit, delete, and add new tasks)
                  </span>
                </label>
              </div>

              <div className={`flex flex-row gap-2`}>
                <input
                  type="checkbox"
                  name="comment"
                  id="comment"
                  className={`w-4 h-4`}
                />
                <label
                  htmlFor="comment"
                  className={` text-sm golos-font ${
                    theme === "light" ? "text-neutral-900" : "text-neutral-100"
                  }`}>
                  Commenter{" "}
                  <span
                    className={`${
                      theme === "light"
                        ? "text-neutral-500"
                        : "text-neutral-400"
                    }`}>
                    (can leave comments on tasks only)
                  </span>
                </label>
              </div>

              <div className={`flex flex-row gap-2`}>
                <input
                  type="checkbox"
                  name="full"
                  id="full"
                  className={`w-4 h-4`}
                />
                <label
                  htmlFor="full"
                  className={` text-sm golos-font ${
                    theme === "light" ? "text-neutral-900" : "text-neutral-100"
                  }`}>
                  Project Manager{" "}
                  <span
                    className={`${
                      theme === "light"
                        ? "text-neutral-500"
                        : "text-neutral-400"
                    }`}>
                    (can edit, delete, comment, and add new tasks)
                  </span>
                </label>
              </div>
            </div>

            <div className={`mt-4`}>
              <textarea
                name="message"
                placeholder="Add a message (optional)"
                className={`w-full resize-none h-32 p-3 rounded-md border-[1.5px] px-4 border-blue-400  focus:border-blue-600 focus:outline-none
                ${
                  theme === "light"
                    ? "bg-task-light-white text-task-sidebar-dark"
                    : "bg-task-sidebar-dark text-task-light-white"
                }`}
              />
            </div>
          </div>

          <div>
            <div
              className={`text-sm font-medium golos-font text-neutral-400  p-2`}>
              Note: You can invite up to 5 people at a time, and you can only
              invite people who have registered on the platform.
            </div>

            <div className={`mt-4`}>
              <Button
                label="Invite"
                bgColor="secondary"
                size="sm"
                className="w-full mt-4"
                onClick={handleSendInvite}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InviteModal;
