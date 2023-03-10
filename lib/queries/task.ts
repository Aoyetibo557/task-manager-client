import API from "../hooks/axios";
import { auth } from "../firebase.js";
import { Task, ReturnObject } from "../utils/types";

const CREATE_TASK_ROUTE = "/tasks/createtask";
const GET_TASKS_ROUTE = "/tasks/getboardtasks";
const UPDATE_TASK_ROUTE = "/tasks/updatetask";
const DELETE_TASK_ROUTE = "/tasks/deletetask";
const UPDATE_TASK_STATUS = "/tasks/updatetaskstatus";
const ARCHIVE_TASK_ROUTE = "/tasks/archivetask";
const GET_ARCHIVED_TASKS_ROUTE = "/tasks/getarchivedtasks";
const GET_RECENT_TASKS_ROUTE = "/tasks/getrecenttasks";
const PIN_TASK_ROUTE = "/tasks/pintask";
const UNPIN_TASK_ROUTE = "/tasks/unpintask";
const GET_PINNED_TASKS_ROUTE = "/tasks/getpinnedtasks";
const GET_USER_TASKS_ROUTE = "/tasks/getusertasks";

// create a new task
async function createTask(task: Task | any) {
  const { data } = await API.post<Task>(`${CREATE_TASK_ROUTE}`, task);
  return data;
}

// get all tasks for a board
async function getBoardTasks(boardid: string) {
  const { data } = await API.get<Task[] | any>(`${GET_TASKS_ROUTE}/${boardid}`);
  return data;
}

// update a task
async function updateTask(taskid: string | any, task: Task | any) {
  const { data } = await API.put<Task | any>(
    `${UPDATE_TASK_ROUTE}/${taskid}`,
    task
  );
  return data;
}

// delete a task
async function deleteTask(taskid: string | any) {
  const { data } = await API.delete<Task>(`${DELETE_TASK_ROUTE}/${taskid}`);
  return data;
}

// update a task status
async function updateTaskStatus(taskid: any, status: string) {
  const { data } = await API.put<Task>(`${UPDATE_TASK_STATUS}/${taskid}`, {
    status,
  });
  return data;
}

// archive a task
async function archiveTask(taskid: string | any) {
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

// get all recent tasks for a user
async function getRecentTasks(userid: string) {
  const { data } = await API.get(`${GET_RECENT_TASKS_ROUTE}/${userid}`);
  return data;
}

// pin a task
async function pinTask(taskid: string | any) {
  const { data } = await API.put<Task>(`${PIN_TASK_ROUTE}/${taskid}`);
  return data;
}

// unpin a task
async function unpinTask(taskid: string | any) {
  const { data } = await API.put<Task>(`${UNPIN_TASK_ROUTE}/${taskid}`);
  return data;
}

// get all pinned tasks for a user
async function getPinnedTasks(userid: string | any) {
  const { data } = await API.get(`${GET_PINNED_TASKS_ROUTE}/${userid}`);
  return data;
}

// get all tasks for a user
async function getUserTasks(userid: string | any) {
  const { data } = await API.get(`${GET_USER_TASKS_ROUTE}/${userid}`);
  return data;
}

export {
  createTask,
  getBoardTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
  archiveTask,
  getArchivedTasks,
  getRecentTasks,
  pinTask,
  unpinTask,
  getPinnedTasks,
  getUserTasks,
};
