import React, { createContext, Dispatch, useReducer } from "react";
import { TaskActions, UserState, queryOptions } from "./Interfaces";
import userReducer from "./TaskReducer";

const defaultState: UserState = {
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
  UserState,
  Dispatch<TaskActions>,
]>([
  defaultState,
  () => null,
]);

export const TaskProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, defaultState);
  return (
    <TaskContext.Provider value={[state, dispatch]}>
      {children}
    </TaskContext.Provider>
  )
}