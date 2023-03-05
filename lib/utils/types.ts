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
