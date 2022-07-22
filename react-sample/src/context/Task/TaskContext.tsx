import React, { createContext, Dispatch, useReducer } from "react";
import { TaskActions, TaskState, queryOptions } from "./Interfaces";
import taskReducer from "./TaskReducer";

const defaultState: TaskState = {
  items: [],
  meta: {
    itemCount: 0,
    totalItems: 0,
    itemsPerPage: 0,
    totalPages: 0,
    currentPage: 0
  },
  loading: false,
  error: null,
}
export const defaultQueryOptions: queryOptions = {
  paginate: {
    limit: 10,
    page: 1
  },
  filter: {
    deleteflg: 0
  }
}

export const TaskContext = createContext<[
  TaskState,
  Dispatch<TaskActions>,
]>([
  defaultState,
  () => null,
]);

export const TaskProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, defaultState);
  return (
    <TaskContext.Provider value={[state, dispatch]}>
      {children}
    </TaskContext.Provider>
  )
}