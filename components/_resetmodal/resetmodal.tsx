import { useState, Dispatch, useContext } from "react";
import { Button } from "../base-components/button/button";
import Modal from "../Utility/Modal/modal";
import { IoCloseCircleOutline } from "react-icons/io5";
import { AiOutlineExclamation } from "react-icons/ai";
import { ThemeContext } from "../Layout/_contexts/themecontext";
import { message } from "antd";
import { usePasswordValidate } from "@/lib/hooks/useFormValidation";
import { resetPassword } from "@/lib/queries/user";
import { useAuth } from "@/lib/hooks/useAuth";
import { AuthType } from "@/lib/utils/types";

type Props = {
  title: string;
  subtitle?: string;
  className?: string;
  loading?: boolean;
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  icon?: JSX.Element;
};

const ResetModal = (props: Props) => {
  const { theme } = useContext(ThemeContext);
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth() as AuthType;

  const { errorMessage: passwordErrorMessage, validate: validatePassword } =
    usePasswordValidate() as any;

  const handleReset = async () => {
    setError("");
    const isPasswordValid =
      validatePassword(newpassword as any) ||
      validatePassword(confirmpassword as any);

    if (!isPasswordValid) {
      setError(
        "Please enter valid password. Password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character."
      );

      return;
    }
    if (newpassword !== confirmpassword) {
      setError("Passwords do not match!. Please try again");
      return;
    }

    const res = await resetPassword(newpassword, user.userid);
    if (res.status === "success") {
      message.success("Password reset successfully");
      props.setOpen(false);
    } else {
      if (res.status === "error") {
        setError(res.message);
      }
    }
  };

  return (
    <div className={props.className}>
      <Modal
        title={
          <div className="inline-flex flex-row mb-4 items-center w-full justify-between">
            <div
              className={` flex flex-row items-center gap-2 golos-font  ${
                theme === "light" ? "text-neutral-900" : "text-neutral-100"
              }`}>
              {props.icon || <AiOutlineExclamation className="w-5 h-5" />}
              <div className={`text-base font-semibold `}>{props.title}</div>
            </div>
            <div>
              <Button
                label={<IoCloseCircleOutline className="w-5 h-5" />}
                onClick={() => props.setOpen(false)}
                bgColor="other"
                size="xs"
              />
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
          <div className="flex flex-col gap-6">
            <p
              className={`text-sm font-medium golos-font ${
                theme === "light" ? "text-neutral-500" : "text-neutral-400"
              }`}>
              {props.subtitle}
            </p>
          </div>
          {/* ERROR DIV */}
          <div className="mt-6">
            {error && (
              <div
                className={`text-sm font-medium golos-font text-red-500  p-2`}>
                *{error}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4 mt-6">
            <label
              htmlFor="newpassword"
              className="text-sm font-medium golos-font">
              New password
            </label>
            <input
              name="newpassword"
              type="password"
              value={newpassword}
              onChange={(e) => setNewpassword(e.target.value)}
              className={`text-sm golos-font font-medium p-1 rounded-sm shadow-sm profile-details-input
            ${
              theme === "light"
                ? "text-neutral-500 bg-white border-[0.7px] border-neutral-500 outline-[0.6px] focus:outline-neutral-400"
                : "text-neutral-200 bg-task-sidebar-light-dark border-[0.6px] border-task-light-white focus:outline-neutral-600"
            }`}
            />
          </div>
          <div className="flex flex-col gap-4 mt-6">
            <label
              htmlFor="confrimpassword"
              className="text-sm font-medium golos-font">
              Confrim password
            </label>
            <input
              name="confirmpassword"
              type="password"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              className={`text-sm golos-font font-medium p-1 rounded-sm shadow-sm profile-details-input
            ${
              theme === "light"
                ? "text-neutral-500 bg-white border-[0.7px] border-neutral-500 outline-[0.6px] focus:outline-neutral-400"
                : "text-neutral-200 bg-task-sidebar-light-dark border-[0.6px] border-task-light-white focus:outline-neutral-600"
            }`}
            />
          </div>

          <div>
            <p className="text-xs font-medium golos-font text-neutral-400 mt-10">
              We strongly recommend you to use a password manager to generate a
              secure password and store it safely.
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <Button
              label="Submit New Password"
              onClick={handleReset}
              bgColor="secondary"
              size="sm"
              className="mt-10"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ResetModal;
