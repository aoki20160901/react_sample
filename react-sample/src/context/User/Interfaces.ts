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
export interface User {
  id: string,
  name: string,
  company: string,
  tel: string,
}

export interface PaginationMeta {
  itemCount: number,
  totalItems: number,
  itemsPerPage: number,
  totalPages: number,
  currentPage: number
}

export interface UserState {
  items: User[],
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
    items: User[];
    meta: PaginationMeta;
  }
  [ActionTypes.LoadMore]: {
    items: User[];
    meta: PaginationMeta;
  }
  [ActionTypes.Create]: {
    task: User;
  }
  [ActionTypes.Update]: {
    task: User;
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