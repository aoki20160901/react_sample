import React from 'react';
import { Button } from '@material-ui/core';
import { useTaskAction } from '../../context/Task/TaskHooks';
import { deleteTask } from '../../context/Task/TaskActions';

interface IProps {
  id: string,
  showDelete: boolean,
}
function DeleteBtn(props: IProps) {
  const [, deleteTaskCb] = useTaskAction(deleteTask);

  const removeTask = (id: string) => () => {
    deleteTaskCb(id);
  }

  return (
    <div>
      {props.showDelete && (<Button onClick={removeTask(props.id)} color="secondary" variant="contained"> 削除</Button>)}
    </div>
  );
}

export default DeleteBtn;