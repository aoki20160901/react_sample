import { Task } from "../../Task";
import { TaskActions, TaskState, ActionTypes } from "./Interfaces";

const taskReducer = (state: TaskState, action: TaskActions) => {
  switch (action.type) {
    case ActionTypes.Set: {
      const { items, meta } = action.payload;
      return {
        ...state,
        items,
        meta,
      }
    }
    case ActionTypes.LoadMore: {
      const { items, meta } = action.payload;
      return {
        ...state,
        items: [...state.items, ...items],
        meta,
      }
    }
    case ActionTypes.Create: {
      const { task } = action.payload
      return {
        ...state,
        items: [task, ...state.items],
      }
    }
    case ActionTypes.Update: {
      const { task } = action.payload;
      const updatedTasks = state.items.map((e: Task) => e.id === task.id ? task : e);
      return {
        ...state,
        items: updatedTasks,
      }
    }
    case ActionTypes.Delete: {
      const { id } = action.payload;
      return {
        ...state,
        items: state.items.filter((task: Task) => task.id !== id)
      }
    }

    case ActionTypes.SetLoading: {
      return {
        ...state,
        loading: action.payload.loading
      }
    }
    case ActionTypes.SetError: {
      return {
        ...state,
        loading: action.payload.error
      }
    }
  }
}

export default taskReducer;