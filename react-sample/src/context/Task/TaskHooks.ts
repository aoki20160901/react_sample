import React, { useCallback, useState } from "react"
import { TaskContext } from "./TaskContext"

export const useTasks = () => {
  const context = React.useContext(TaskContext)
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider')
  }
  return context
}

export const useTaskAction = (action: any):
  [{ loading: boolean, error: any }, (args?: any) => Promise<void>] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [, dispatch] = useTasks();
  return [
    { loading, error },
    //@ts-ignore
    useCallback(async (...args) => {
      setLoading(true);
      action(dispatch, ...args)
        .then(() => {
          setLoading(false)
        })
        .catch((err: any) => setError(err));
    }, [dispatch, action])
  ]
}
