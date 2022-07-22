export interface queryOptions {
  [key: string]: any;
  paginate: {
    limit: number,
    page: number,
  },
  filter?: {
    deleteflg?: number,
    id?: {
      NOT_IN: string[]
    },
  }
}
export interface Task {
  id: string,
  name: string,
  status: number,
  deleteflg: number,
  createdAt?: string,
  upatedAt?: string
}

export interface PaginationMeta {
  itemCount: number,
  totalItems: number,
  itemsPerPage: number,
  totalPages: number,
  currentPage: number
}

export interface TaskState {
  items: Task[],
  meta: PaginationMeta,
  loading: boolean;
  error: any
}

export enum ActionTypes {
  Create = 'createTask',
  Delete = 'deleteTask',
  Update = 'updateTask',
  LoadMore = 'loadMoreTasks',
  Set = 'setTask',
  SetLoading = 'setLoading',
  SetError = 'setError'
}

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? {
    type: Key;
  }
  : {
    type: Key;
    payload: M[Key];
  }
};

type TaskPayload = {
  [ActionTypes.Set]: {
    items: Task[];
    meta: PaginationMeta;
  }
  [ActionTypes.LoadMore]: {
    items: Task[];
    meta: PaginationMeta;
  }
  [ActionTypes.Create]: {
    task: Task;
  }
  [ActionTypes.Update]: {
    task: Task;
  }
  [ActionTypes.Delete]: {
    id: string;
  }
  [ActionTypes.SetLoading]: {
    loading: boolean;
  }
  [ActionTypes.SetError]: {
    error: any;
  }
}

export type TaskActions = ActionMap<TaskPayload>[keyof ActionMap<TaskPayload>];