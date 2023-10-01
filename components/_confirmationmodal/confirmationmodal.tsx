import { Dispatch, useContext } from "react";
import { Button } from "../base-components/button/button";
import Modal from "../Utility/Modal/modal";
import { IoCloseCircleOutline } from "react-icons/io5";
import { AiOutlineExclamation } from "react-icons/ai";
import { ThemeContext } from "../Layout/_contexts/themecontext";

type Props = {
  title: string;
  subtitle?: string;
  className?: string;
  loading?: boolean;
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  primaryBtnLabel?: string;
  secondaryBtnLabel?: string;
  primaryBtnColor?: "primary" | "secondary" | "other" | "quaternary";
  secondaryBtnColor?: "primary" | "secondary" | "other" | "quaternary";
  icon?: JSX.Element;
};

export const ConfirmationModal = (props: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={props.className}>
      <Modal
        title={
          <div className="inline-flex flex-row mb-4 items-center w-full justify-between">
            <div
              className={` flex flex-row items-center gap-2 golos-font  ${
                theme === "light" ? "text-neutral-900" : "text-neutral-100"
              } `}>
              {props.icon || <AiOutlineExclamation className="w-5 h-5" />}
              <div
                className={`text-base font-semibold 
             
              `}>
                {props.title}
              </div>
            </div>
            <div>
              <Button
                label={
                  <IoCloseCircleOutline
                    className={`w-7 h-7 ${
                      theme === "light" && "text-neutral-500"
                    } `}
                  />
                }
                onClick={() => props.setOpen(false)}
                btnType="icon"
                size="xs"
              />
            </div>
          </div>
        }
        open={props.open}
        theme={theme}
        setOpen={props.setOpen}>
        <div className="flex flex-col ">
          <div className="flex flex-col gap-6">
            <p
              className={`text-sm font-medium golos-font
            ${theme === "light" ? "text-neutral-500" : "text-neutral-400"}
            `}>
              {props.subtitle}
            </p>
            <div className="flex flex-row gap-4">
              <Button
                label={props.primaryBtnLabel || "Confirm"}
                bgColor={props.primaryBtnColor || "primary"}
                onClick={props.onConfirm}
                size="sm"
              />
              <Button
                label={props.secondaryBtnLabel || "Cancel"}
                bgColor={props.secondaryBtnColor || "secondary"}
                onClick={() => props.setOpen(false)}
                size="sm"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
