import API from "../hooks/axios";
import { auth } from "../firebase.js";
import { Board, ReturnObject, User } from "../utils/types";

const BOARD_ROUTE = "/boards/getuserboards";
const CREATE_BOARD_ROUTE = "/boards/createboard";

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

export { getUserBoards, createBoard };
