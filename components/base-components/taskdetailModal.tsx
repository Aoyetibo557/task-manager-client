import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Modal from "../Utility/Modal/modal";
import {
  BsThreeDotsVertical,
  BsThreeDots,
  BsFillPinFill,
  BsPin,
  BsPlus,
  BsPencil,
  BsTrash,
  BsArchive,
  BsPlusCircle,
  BsCalendar4Week,
} from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { MdArrowForwardIos } from "react-icons/md";
import { Task, AuthType } from "@/lib/utils/types";
import type { MenuProps } from "antd";
import { Dropdown, message, Spin, Tag } from "antd";
import { Button } from "../base-components/button/button";
import {
  archiveTask,
  deleteTask,
  pinTask,
  unpinTask,
  starTask,
  unStarTask,
  addLabelToTask,
  removeLabelFromTask,
  setDueDate,
} from "@/lib/queries/task";
import { useAuth } from "@/lib/hooks/useAuth";
import { ActionTypes } from "@/lib/utils/actions";
import { formatDate, formatRelativeTime } from "@/lib/utils/util";
import { ConfirmationModal } from "../_confirmationmodal/confirmationmodal";
import { TaskdetailTabs } from "../base-components/taskdetailtabs";
import TaskStatusModal from "../_task/_tasksdetailcomps/taskstatus";
import { TaskPriorityModal } from "../_task/_tasksdetailcomps/taskpriority";
import { TaskActions } from "@/components/_task/_tasksdetailcomps/taskactioncenter";
import { TaskDetailsDescription } from "@/components/_task/_tasksdetailcomps/taskdetaildescription";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";

type Props = {
  className?: string;
  loading?: boolean;
  error?: Error | null;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  theme?: string;
  task: Task;
  updateTask?: (name: keyof Task, value: string) => void;
  onClick: () => void;
};

const TaskDetailModal = (props: Props) => {
  const [status, setStatus] = useState(props.task.status);
  const [priority, setPriority] = useState(props.task.priority);
  const [pinLoading, setPinLoading] = useState(false);
  const { dispatch, isTaskPinned } = useAuth() as AuthType;
  const [isPinned, setIsPinned] = useState(props.task.pinned);
  const [isStarred, setIsStarred] = useState(props.task.isStarred);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [description, setDescription] = useState(props.task.description);
  const [addingLabel, setAddingLabel] = useState(false);
  const [label, setLabel] = useState("");
  const [deleteBtns, setShowDeleteBtns] = useState(false);
  const [dueDate, setStateDueDate] = useState(props.task?.dueDate || 0);
  const [savedDueDate, setSavedDueDate] = useState(props.task?.dueDate || 0);
  const [changeDate, setChangeDate] = useState(false);
  const [initLabels, setInitLabels] = useState(props.task.labels || []);

  const initialStatus = props.task.status;
  const initialPriority = props.task.priority;
  const initialDescription = props.task.description;

  const resetState = () => {
    setStatus(initialStatus);
    setPriority(initialPriority);
    setDescription(initialDescription);
    setAddingLabel(false);
    setLabel("");
    setShowDeleteBtns(false);
    setStateDueDate(0);
  };

  const handleUpdateInput = (name: keyof Task, value: string) => {
    setStatus(
      name === "status" ? (value as Task["status"]) : props.task.status
    );
    setPriority(
      name === "priority" ? (value as Task["priority"]) : props.task.priority
    );
    setDescription(
      name === "description"
        ? (value as Task["description"])
        : props.task.description
    );

    props.updateTask && props.updateTask(name, value);
  };

  const handleClick = () => {
    props.onClick();
  };

  const handleArchive = async () => {
    const res = await archiveTask(props.task?.taskId);

    if (res.status === "success") {
      message.success(res.message);
      props.setOpen(false);
      dispatch({
        type: ActionTypes.TASK_UPDATED,
        payload: true,
      });
    } else {
      if (res.status === "error") {
        message.error(res.message);
      }
    }
  };

  const handleDelete = async () => {
    const res = await deleteTask(props.task?.taskId);

    if (res.status === "success") {
      message.success(res.message);
      props.setOpen(false);
      dispatch({
        type: ActionTypes.TASK_UPDATED,
        payload: true,
      });
    } else {
      if (res.status === "error") {
        message.error(res.message);
      }
    }
  };

  const handlePin = async () => {
    setPinLoading(true);
    try {
      const res = await pinTask(props.task.taskId);

      if (res.status === "success") {
        message.success(res.message);
        props.setOpen(true);
        setIsPinned(true);
      } else {
        if (res.status === "error") {
          message.error(res.message);
          setPinLoading(false);
        }
      }
    } catch (err) {
      message.error("Something went wrong. Try again later!");
      setPinLoading(false);
    }
  };

  const handleUnpin = async () => {
    setPinLoading(true);
    try {
      const res = await unpinTask(props.task?.taskId);

      if (res.status === "success") {
        message.success(res.message);
        props.setOpen(true);
        setIsPinned(false);
        setPinLoading(false);
      } else {
        if (res.status === "error") {
          message.error(res.message);
          setPinLoading(false);
        }
      }
    } catch (err) {
      message.error("Something went wrong. Try again later!");
      setPinLoading(false);
    }
  };

  const handleStarTask = async () => {
    try {
      const res = await starTask(props.task?.taskId as any);

      if (res.status === "success") {
        message.success(res.message);
        setIsStarred(true);
        props.setOpen(true);
        // dispatch({
        //   type: ActionTypes.TASK_UPDATED,
        //   payload: true,
        // });
      } else {
        if (res.status === "error") {
          message.error(res.message);
        }
      }
    } catch (err: any) {
      message.error("Something went wrong. Try again later!");
    }
  };

  const handleUnStarTask = async () => {
    try {
      const res = await unStarTask(props.task?.taskId as any);

      if (res.status === "success") {
        message.success(res.message);
        props.setOpen(true);
        setIsStarred(false);
        // dispatch({
        //   type: ActionTypes.TASK_UPDATED,
        //   payload: true,
        // });
      } else {
        if (res.status === "error") {
          message.error(res.message);
        }
      }
    } catch (err) {
      message.error("Something went wrong. Try again later!");
    }
  };

  const handleAddLabel = async () => {
    setAddingLabel(true);

    try {
      if (!label) {
        message.error("Please enter a label");
        setAddingLabel(true);
        return;
      }

      const res = await addLabelToTask(props.task?.taskId, label as any);

      if (res.status === "success") {
        message.success(res.message);
        setInitLabels([...initLabels, label]);
        props.setOpen(true);
        // dispatch({
        //   type: ActionTypes.TASK_UPDATED,
        //   payload: true,
        // });
        setAddingLabel(false);
      } else {
        if (res.status === "error") {
          message.error(res.message);
          setAddingLabel(false);
        }
      }
    } catch (err: any) {
      message.error("Something went wrong. Try again later!");
    }
  };

  const handleRemoveLabel = async (label: string) => {
    try {
      const res = await removeLabelFromTask(props.task?.taskId, label as any);

      if (res.status === "success") {
        message.success(res.message);
        props.setOpen(true);
        setInitLabels(initLabels.filter((l) => l !== label));
        // dispatch({
        //   type: ActionTypes.TASK_UPDATED,
        //   payload: true,
        // });
      } else {
        if (res.status === "error") {
          message.error(res.message);
        }
      }
    } catch (err: any) {
      message.error("Something went wrong. Try again later!");
    }
  };

  const handleDueDate = async () => {
    try {
      const res = await setDueDate(props.task?.taskId, dueDate);
      if (res?.status === "success") {
        message.success(res.message);
        setSavedDueDate(dueDate);
        setChangeDate(false);
        props.setOpen(true);
        // dispatch({
        //   type: ActionTypes.TASK_UPDATED,
        //   payload: true,
        // });
      } else {
        if (res?.status === "error") {
          message.error(res.message);
        }
      }
    } catch (err: any) {
      message.error("Something went wrong. Try again later!", err.message);
    }
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    const unixDate = dayjs(date).unix();
    setStateDueDate(unixDate);
  };

  const getRandomColor = () => {
    const colors = ["yellow", "red", "gray", "green", "blue", "purple"];
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const openArchiveModal = () => {
    setIsArchiveModalOpen(true);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <button
          type="submit"
          onClick={openDeleteModal}
          className={`flex flex-row items-center`}>
          <BsTrash className="mr-2 w-3 h-3" />
          Delete
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button
          type="submit"
          onClick={openArchiveModal}
          className={`flex flex-row items-center`}>
          <BsArchive className="mr-2 w-3 h-3" />
          Archive
        </button>
      ),
    },
  ];

  useEffect(() => {
    dispatch({
      type: ActionTypes.TASK_PINACTION || ActionTypes.TASK_UPDATED,
      payload: false,
    });
  }, [isTaskPinned]);

  return (
    <Modal
      title={
        <div
          className={` p-3 font-medium text-lg golos-font mb-2 ${
            props.theme === "light" ? "text-task-dark" : "text-task-light-white"
          }`}>
          <div className={`flex flex-row justify-between`}>
            <div className={`text-sm font-extralight opacity-50`}>
              In list <span className={`underline`}> {props.task?.status}</span>
            </div>
            <div className={`flex flex-row gap-5`}>
              <div>
                <Dropdown
                  menu={{ items }}
                  trigger={["click"]}
                  placement="bottomRight">
                  <BsThreeDots className="cursor-pointer" />
                </Dropdown>
              </div>
              <AiOutlineClose
                className={`w-5 h-5 opacity-50 hover:opacity-75 hover:scale-110 cursor-pointer`}
                onClick={() => props.setOpen(false)}
              />
            </div>
          </div>
        </div>
      }
      open={props.open}
      setOpen={props.setOpen}
      theme={props.theme}>
      <div className="flex flex-col p-3 justify-center gap-6">
        <div>
          <div className={`flex items-center gap-7`}>
            <div
              className={`text-3xl font-medium golos-font ${
                props.theme === "light"
                  ? "text-task-dark"
                  : "text-task-light-white"
              }`}>
              {props.task.name}
            </div>

            <TaskActions
              isPinned={props.task?.pinned || isPinned}
              handleUnpin={handleUnpin}
              handlePin={handlePin}
              handleStarTask={handleStarTask}
              handleUnStarTask={handleUnStarTask}
              isStarred={props.task?.isStarred || isStarred}
              className={`w-5 h-5 cursor-pointer fill-yellow-400 ${
                props.theme === "light"
                  ? "text-task-dark"
                  : "text-task-light-white"
              } `}
            />
          </div>

          <div
            className={` mt-4 flex flex-col gap-3
            ${
              props.theme === "light"
                ? "text-task-dark"
                : "text-task-light-white"
            }
          `}>
            <div className={`flex flex-row gap-10 golos-font text-[15px]`}>
              <span className={`text-neutral-500`}>Status</span>
              <TaskStatusModal
                status={status}
                isActive={props.task?.isActive}
                onUpdateStatus={handleUpdateInput as any}
              />
            </div>

            <div className={`flex flex-row gap-5 golos-font text-[15px]`}>
              <span className={`text-neutral-500 opacity-40`}>Asignee</span>
              <span className={`opacity-40`}>
                {props.task?.assignes?.length === 0
                  ? "None"
                  : "upcoming feature"}{" "}
              </span>
              <BsPlusCircle
                title="Add assignee (upcoming feature)"
                aria-label="Add assignee (upcoming feature)"
                className={`w-5 h-5 opacity-40 hover:none cursor-pointer `}
              />
            </div>

            <div className={`flex flex-row gap-7 golos-font text-[15px]`}>
              <span className={`text-neutral-500`}>Due date</span>
              <span>
                {!savedDueDate || changeDate === true ? (
                  <div className={`flex flex-row items-center gap-3 `}>
                    <DatePicker onChange={onChange} />
                    <MdArrowForwardIos
                      className={`w-5 h-5 cursor-pointer hover:scale-110 opacity-50 hover:opacity-75`}
                      onClick={handleDueDate}
                    />
                    {savedDueDate ? (
                      <AiOutlineClose
                        title={`Cancel`}
                        aria-label={`Cancel`}
                        className={`w-4 h-4 ml-2 opacity-50 cursor-pointer hover:scale-110 hover:opacity-75`}
                        onClick={() => setChangeDate(false)}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  <div className={`flex flex-row`}>
                    <div className={`text-sm`}>{formatDate(savedDueDate)}</div>
                    <BsCalendar4Week
                      title={`Change due date`}
                      aria-label={`Change due date`}
                      className={`w-4 h-4 ml-2 opacity-50 cursor-pointer hover:scale-110 hover:opacity-75`}
                      onClick={() => setChangeDate(true)}
                    />
                  </div>
                )}
              </span>
            </div>

            <div className={`flex flex-row gap-11 golos-font text-[15px]`}>
              <span className={`text-neutral-500`}>Labels</span>
              {addingLabel ? (
                <div className={`flex flex-row items-center gap-3`}>
                  <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder={`Add label`}
                    className={`bg-transparent golos-font text-[13px] border-[1px] border-neutral-300 rounded-md p-1 w-[200px] focus:outline-neutral-500 focus:outline-[0.1px] focus:border-neutral-500`}
                  />
                  <button
                    title={`Add`}
                    arial-label={`Add`}
                    className={`w-14 flex flex-row items-center justify-center rounded-full p-1 text-xs border-[1px] border-neutral-300 hover:border-neutral-500 hover:scale-100`}
                    onClick={handleAddLabel}>
                    Add
                  </button>
                  <AiOutlineClose
                    title={`Cancel`}
                    aria-label={`Cancel`}
                    className={`w-5 h-5 b-[1px] rounded-full p-1 text-xs border-[1px] border-neutral-300 hover:border-neutral-500 hover:scale-100 cursor-pointer`}
                    onClick={() => setAddingLabel(false)}
                  />
                </div>
              ) : (
                <div className={`flex flex-row items-start gap-1`}>
                  <span className={`flex flex-row flex-wrap gap-2`}>
                    {initLabels?.length ?? 0 > 0
                      ? initLabels?.map((label, idx) => (
                          <span
                            key={idx}
                            title={`Label ${label}`}
                            aria-label={`Label ${label}`}
                            className={` flex flex-row items-center justify-center gap-1 font-normal rounded-full w-20 p-1 text-[13px] text-${getRandomColor()}-800 ${
                              deleteBtns && `border-[1.5px] border-red-400`
                            }
                          ${
                            props.theme === "light"
                              ? `bg-gray-200 `
                              : "bg-gray-600  text-task-light-white border-task-light-white "
                          }
                            `}>
                            {label}
                            {deleteBtns && (
                              <AiOutlineClose
                                title={`Remove label`}
                                aria-label={`Remove label`}
                                className={`w-3 h-3 ml-1 cursor-pointer hover:scale-125 hover:font-semibold hover:text-red-400`}
                                onClick={() => handleRemoveLabel(label)}
                              />
                            )}
                          </span>
                        ))
                      : ""}
                  </span>
                  <button
                    className={`w-24 flex flex-row items-center justify-center rounded-full p-1 text-xs border-[1px] border-neutral-300 hover:border-neutral-500 hover:scale-100`}
                    onClick={() => setAddingLabel(true)}>
                    Add label
                    <BsPlus className={`w-5 h-5 opacity-40 cursor-pointer`} />
                  </button>
                  {initLabels?.length > 0 && (
                    <TbEdit
                      className={`w-5 h-5 opacity-50 hover:opacity-75 cursor-pointer`}
                      onClick={() => setShowDeleteBtns(!deleteBtns)}
                    />
                  )}
                </div>
              )}
            </div>

            <div className={`flex flex-row gap-7 golos-font text-[15px]`}>
              <span className={`text-neutral-500`}>Priority</span>
              <TaskPriorityModal
                priority={priority}
                onUpdate={handleUpdateInput as any}
              />
            </div>
          </div>
        </div>

        <div>
          {/* description  */}
          <TaskDetailsDescription
            description={description}
            onUpdate={handleUpdateInput as any}
            theme={props.theme}
          />
        </div>

        <div>
          {/* bottom tabs */}
          <div>
            <TaskdetailTabs task={props.task} />
          </div>
        </div>

        {(props.task.status !== status ||
          props.task.priority !== priority ||
          props.task.description !== description) && (
          <div className={`flex flex-row justify-end gap-8`}>
            <Button
              label="cancel"
              bgColor="other"
              size="sm"
              btnType="button"
              onClick={resetState}
            />
            <Button
              label="save changes"
              bgColor="secondary"
              size="sm"
              btnType="button"
              onClick={handleClick}
            />
          </div>
        )}

        <div
          className={`border-t-[0.6px] ${
            props.theme === "light"
              ? "border-neutral-400"
              : "border-neutral-600"
          }`}>
          <div
            className={`text-sm golos-font font-normal mt-2
          ${props.theme === "light" ? "text-neutral-500" : "text-neutral-400"}
          `}>
            This task was created on {formatDate(props.task?.timestamp || "")}
          </div>
        </div>

        {props.task.boardName && (
          <div
            className={`flex flex-row items-center justify-between font-medium text-xs golos-font ${
              props.theme === "light" ? "text-neutral-600" : "text-neutral-400"
            }`}>
            {`Board: ${props.task?.boardName}`}
          </div>
        )}

        <div>
          {isDeleteModalOpen && (
            <ConfirmationModal
              open={isDeleteModalOpen}
              setOpen={setIsDeleteModalOpen}
              title="Delete Task"
              subtitle="Are you sure you want to delete this task?"
              onConfirm={handleDelete}
              primaryBtnLabel="Delete"
              secondaryBtnLabel="Cancel"
            />
          )}

          {isArchiveModalOpen && (
            <ConfirmationModal
              open={isArchiveModalOpen}
              setOpen={setIsArchiveModalOpen}
              title="Archive Task"
              subtitle="Are you sure you want to archive this task?"
              onConfirm={handleArchive}
              primaryBtnLabel="Archive"
              secondaryBtnLabel="Cancel"
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TaskDetailModal;
