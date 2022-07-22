import React from 'react';
import { Checkbox } from '@material-ui/core';
import { useTaskAction } from '../../context/Task/TaskHooks';
import { updateTask } from '../../context/Task/TaskActions';

interface IProps {
  id: string,
  status: number,
}

function CheckboxStatus(props: IProps) {
  const [, updateTaskCb] = useTaskAction(updateTask);

  const changeStatus = (id: string, currentStatus: number) => {
    const status = currentStatus ? 0 : 1;
    updateTaskCb({ id, status });
  }
  return (
    <div><Checkbox onClick={e => {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation(); changeStatus(props.id, props.status)
    }} checked={props.status === 1} /></div>
  );
}

export default CheckboxStatus;