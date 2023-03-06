export interface Task {
  taskname: string;
  description?: string;
  taskid?: string;
  boardId: string;
  userId: string;
  status: string;
  subtasks?: Task[];
  timestamp?: string;
  parentTaskId?: string;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  userid: string;
  boards?: Board[];
  tasks?: Task[];
  url?: string;
  phone?: string;
  country?: string;
  language?: string;
  timestamp?: string;
}
