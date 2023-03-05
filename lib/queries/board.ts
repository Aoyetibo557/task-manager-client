import API from "../hooks/axios";
import { auth } from "../firebase.js";

const BOARD_ROUTE = "/boards/getuserboards";
const CREATE_BOARD_ROUTE = "/boards/createboard";
interface Board {
  name: string;
  description?: string;
  userid: string;
  boardId?: string;
}

// Get all boards for a user
async function getUserBoards(userid: string) {
  const { data } = await API.get<Board[]>(`${BOARD_ROUTE}/${userid}`);
  return data;
}

// create a new board
async function createBoard(board: Board) {
  const { data } = await API.post<Board>(`${CREATE_BOARD_ROUTE}`, board);
  return data;
}

export { getUserBoards, createBoard };
