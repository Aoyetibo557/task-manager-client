import React, { Dispatch, SetStateAction } from "react";
import Modal from "../Utility/Modal/modal";

type Props = {
  title: string;
  className?: string;
  loading?: boolean;
  error?: Error | null;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClick: () => void;
  theme?: string;
  btnLabel?: string;
  inputVal?: string;
  setInputVal?: (e: any) => void;
};

const CreateBoardModal = (props: Props) => {
  const handleClick = () => {
    props.onClick && props.onClick();
    props.setOpen && props.setOpen(false);
    props.setInputVal && props.setInputVal("");
  };
  return (
    <Modal
      title={
        <div
          className={`font-medium text-xl golos-font mb-4 p-3
            ${
              props.theme === "light"
                ? "text-task-dark"
                : "text-task-light-white"
            }
          `}>
          {props.title}
        </div>
      }
      open={props.open}
      setOpen={props.setOpen}
      theme={props.theme}>
      <div className="flex flex-col justify-center gap-4 p-3">
        <div>
          <label
            className={`golos-font font-medium
          ${props.theme === "light" ? "text-task-dark" : "text-neutral-300"}
          `}>
            Board Name
          </label>
        </div>
        <div>
          <input
            type="text"
            className={`border rounded-sm bg-transparent p-2 w-full golos-font font-light
            ${
              props.theme === "light"
                ? "text-task-dark border-neutral-400 border-[0.3px] focus:outline focus:border-task-blue focus:outline-[0.1px]"
                : "text-task-light-white border-neutral-400 border-[0.3px] focus:outline focus:border-task-light-white focus:outline-[0.1px]"
            }
            `}
            value={props.inputVal}
            onChange={(e) =>
              props.setInputVal && props.setInputVal(e.target.value)
            }
            placeholder="e.g My Board"
          />
        </div>

        <div>
          <button
            onClick={handleClick}
            className={`p-2 rounded-md w-full golos-font font-light opacity-80 hover:opacity-100
            ${
              props.theme === "light"
                ? "bg-task-sidebar-light-dark text-task-white "
                : "bg-task-light-white text-task-sidebar-dark"
            }
            `}>
            {props.loading ? "Loading..." : props.btnLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateBoardModal;
