import API from "../hooks/axios";
import { auth } from "../firebase.js";
import { Task } from "../utils/types";

const CREATE_TASK_ROUTE = "/tasks/createtask";
const GET_TASKS_ROUTE = "/tasks/getboardtasks";
const UPDATE_TASK_ROUTE = "/tasks/updatetask";
const DELETE_TASK_ROUTE = "/tasks/deletetask";
const UPDATE_TASK_STATUS = "/tasks/updatetaskstatus";
const ARCHIVE_TASK_ROUTE = "/tasks/archivetask";
const GET_ARCHIVED_TASKS_ROUTE = "/tasks/getarchivedtasks";

// create a new task
async function createTask(task: Task) {
  const { data } = await API.post<Task>(`${CREATE_TASK_ROUTE}`, task);
  return data;
}

// get all tasks for a board
async function getBoardTasks(boardid: string) {
  const { data } = await API.get<Task[]>(`${GET_TASKS_ROUTE}/${boardid}`);
  return data;
}

// update a task
async function updateTask(task: Task) {
  const { data } = await API.put<Task>(`${UPDATE_TASK_ROUTE}`, task);
  return data;
}

// delete a task
async function deleteTask(taskid: string) {
  const { data } = await API.delete<Task>(`${DELETE_TASK_ROUTE}/${taskid}`);
  return data;
}

// update a task status
async function updateTaskStatus(taskid: string, status: string) {
  const { data } = await API.put<Task>(`${UPDATE_TASK_STATUS}/${taskid}`, {
    status,
  });
  return data;
}

// archive a task
async function archiveTask(taskid: string) {
  const { data } = await API.put<Task>(`${ARCHIVE_TASK_ROUTE}/${taskid}`);
  return data;
}

// get all archived tasks for a board
async function getArchivedTasks(boardid: string) {
  const { data } = await API.get<Task[]>(
    `${GET_ARCHIVED_TASKS_ROUTE}/${boardid}`
  );
  return data;
}

export {
  createTask,
  getBoardTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
  archiveTask,
};
