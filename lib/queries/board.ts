import API from "../hooks/axios";
import { auth } from "../firebase.js";
import { Board, ReturnObject, User } from "../utils/types";

const BOARD_ROUTE = "/boards/getuserboards";
const CREATE_BOARD_ROUTE = "/boards/createboard";
const CLEAR_BOARD_ROUTE = "/boards/cleartasks";
const DELETE_BOARD_ROUTE = "/boards/deleteboard";
const SEND_INVITE_ROUTE = "/boards/sendinvite";
const BOARD_tASK_COUNT_ROUTE = "/boards/getboardtaskcount";

// Get all boards for a user
async function getUserBoards(userid: User | any) {
  const { data } = await API.get(`${BOARD_ROUTE}/${userid}`);
  return data;
}

// create a new board
async function createBoard(board: Board) {
  const { data } = await API.post<Board>(`${CREATE_BOARD_ROUTE}`, board);
  return data;
}

// clear all tasks from a board
async function clearBoard(boardid: string) {
  const { data } = await API.put<ReturnObject | any>(
    `${CLEAR_BOARD_ROUTE}/${boardid}`
  );
  return data;
}

// delete a board
async function deleteBoard(boardid: string) {
  const { data } = await API.delete<ReturnObject | any>(
    `${DELETE_BOARD_ROUTE}/${boardid}`
  );
  return data;
}

// send an invite to users to join a board
async function sendInvite(
  boardid: string,
  emails: string[],
  senderemail: string
) {
  const { data } = await API.post<ReturnObject | any>(
    `${SEND_INVITE_ROUTE}/${boardid}`,
    { emails, senderemail }
  );
  return data;
}

// get the number of tasks for a board
async function getBoardTaskCount(boardid: string) {
  const { data } = await API.get<ReturnObject | any>(
    `${BOARD_tASK_COUNT_ROUTE}/${boardid}`
  );
  return data;
}

export {
  getUserBoards,
  createBoard,
  clearBoard,
  deleteBoard,
  sendInvite,
  getBoardTaskCount,
};
