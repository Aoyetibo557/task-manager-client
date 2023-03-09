export interface Task {
  name: string;
  description?: string | undefined;
  taskid?: string;
  boardId: string;
  boardName?: string;
  userId: string;
  status: string;
  subtasks?: Task[];
  timestamp: string | number | undefined;
  parentTaskId?: string | null | undefined;
  pinned?: boolean | undefined;
  returnObject?: ReturnObject | undefined;
  message?: string | undefined;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  userid: string;
  boards?: Board[] | undefined;
  tasks?: Task[];
  status: string;
  url?: string | undefined;
  phone?: string | undefined;
  country?: string | undefined;
  language?: string | undefined;
  timestamp?: string | number | undefined;
  tourtaken?: boolean | undefined;
  username?: string | undefined;
  returnObject?: ReturnObject | undefined;
}

export interface Board {
  name: string;
  description?: string | undefined;
  userid: string;
  boardId?: string | undefined;
  status?: string | undefined;
  message?: string | undefined;
  returnObject?: ReturnObject | undefined;
}

export interface ReturnObject {
  data?: any;
  status: string | undefined;
  tasks?: Task[];
  boards?: Board[];
  user?: User;
  error?: string;
  message?: string;
}

export interface AuthType {
  user: User;
  loading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  findUserByEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  dispatch: (action: { type: string; payload: {} }) => void;
  handleSetUser: (user: {}) => void;
  setUser: (user: {}) => void;
  isLoggedIn: boolean;
  isTaskActionDispatched: boolean;
  isTaskPinned: boolean;
  isUserActionDispatched: boolean;
}
