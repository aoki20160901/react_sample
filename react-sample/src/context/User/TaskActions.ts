import axios from "axios";
import { Dispatch } from "react";
import { ActionTypes, TaskActions } from "./Interfaces";
import { defaultQueryOptions } from "./TaskContext";

// Set Loading
export const setLoading = (dispatch: Dispatch<TaskActions>, status: boolean) =>
  dispatch({ type: ActionTypes.SetLoading, payload: { loading: status } });

// Set Error
export const setError = (dispatch: Dispatch<TaskActions>, error: any) =>
  dispatch({
    type: ActionTypes.SetError,
    payload: { error: error.status, message: error.message } as any
  });

export const getTasks = async (dispatch: Dispatch<TaskActions>, queryOptions = defaultQueryOptions) => {
  setLoading(dispatch, true);
  // do fetch
  await axios
    .post('todo/list', queryOptions)
    .then(res => {
      console.log("HERE", res.data);
      const { items, meta } = res.data;
      setLoading(dispatch, false);
      dispatch({
        type: ActionTypes.LoadMore,
        payload: {
          items,
          meta
        }
      });
    })
    .catch(error => {
      const result = error;
      setLoading(dispatch, false);
      // set error if has any
      dispatch({
        type: ActionTypes.SetError,
        payload: {
          error: true,
          message: result,
        } as any
      });
    });
};

export const createTask = async (dispatch: Dispatch<TaskActions>, name: string) => {

  // do fetch
  await axios
    .post('todo', { name, deleteflg: 0, status: 0 })
    .then(res => {
      const { data: task } = res;
      dispatch({
        type: ActionTypes.Create,
        payload: {
          task
        }
      });
    })
};

export const updateTask = async (
  dispatch: Dispatch<TaskActions>,
  { status, id }: { status: number, id: string }
) => {

  // do fetch
  await axios
    .patch(`todo/${id}`, { status })
    .then(res => {
      const { data: task } = res;
      dispatch({
        type: ActionTypes.Update,
        payload: {
          task
        }
      });
    })
};

export const deleteTask = async (dispatch: Dispatch<TaskActions>, id: string) => {

  // do fetch
  await axios
    .delete(`todo/${id}`)
    .then(res => {
      dispatch({
        type: ActionTypes.Delete,
        payload: {
          id
        }
      });
    })
};