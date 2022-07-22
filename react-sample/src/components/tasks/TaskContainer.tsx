import './task.css';
import { Button, TextField } from "@material-ui/core"
import { useEffect, useState } from "react";
import { createTask, getTasks } from "../../context/Task/TaskActions";
import { defaultQueryOptions } from "../../context/Task/TaskContext";
import { useTaskAction, useTasks } from "../../context/Task/TaskHooks";
import ListTask from "../tasks/ListTask";
import LogoutButton from './LogoutButton';

const TaskContainer = () => {
  const [taskName, setTaskName] = useState<string>('');
  const [disabledButton, setDisabled] = useState<boolean>(true)
  const [{ items: tasks, meta }] = useTasks();
  const [, createTaskCb] = useTaskAction(createTask);
  const [{ loading: getTaskLoading, error }, getTaskCb] = useTaskAction(getTasks);

  useEffect(() => {
    getTaskCb();
  }, [getTaskCb])

  let areMoreTasks = false;

  const loadMoreTask = () => {
    const ids = tasks.map((e) => e.id);
    const queryOptions = {
      ...defaultQueryOptions,
      filter: {
        ...defaultQueryOptions.filter,
        id: {
          NOT_IN: ids
        }
      }
    }
    getTaskCb(queryOptions);
  }


  const onCreatedTask = () => {
    if (taskName) {
      setDisabled(true);
      createTaskCb(taskName)
        .then(() => {
          setTaskName('')
        })
        .catch((err) => {
          setDisabled(false)
          console.error(err)
        })
    }
  }

  areMoreTasks = tasks && meta.currentPage < meta.totalPages

  const handleChangeInput = (e: any): void => {
    if (e.target.value.trim()) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setTaskName(e.target.value)
  }

  return (<>
    <div className="header-content">
      <LogoutButton />
      <div>
        <TextField id="outlined-basic" variant="outlined" onChange={handleChangeInput} value={taskName} className="input-name" />
        <Button variant="contained" onClick={onCreatedTask} className="btn-add" disabled={disabledButton}>追加</Button>
      </div>
    </div>
    <div className="body-content">
      {(getTaskLoading) && (<div className="loadding"><div className="loader"></div></div>)}
      {error && (<div> Error ....</div>)}
      {tasks && <ListTask tasks={tasks} />}
      {areMoreTasks && <Button onClick={() => loadMoreTask()} disabled={getTaskLoading} className="load-more-btn"> Show more</Button>}
    </div>
  </>)
}

export default TaskContainer