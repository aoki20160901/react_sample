import DeleteBtn from './DeleteBtn';
import CheckboxStatus from './CheckboxStatus';
import React, { useState } from 'react';
import { Task } from '../../context/Task/Interfaces';

interface IProps {
  task: Task,
}

function TaskElem(props: IProps) {
  const [showDelete, setShowDelete] = useState(false)

  return (

    <div className="flex-row" key={props.task.id}
      onMouseEnter={() => setShowDelete(true)}
      onTouchStart={() => setShowDelete(true)}
      onTouchEnd={() => setTimeout(() => setShowDelete(false), 1000)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <CheckboxStatus id={props.task.id} status={props.task.status} />
      <div>
        <span className={props.task.status ? 'text-decoration' : ''}> {props.task.name}</span>
      </div>
      <div className="delete-btn">
        <DeleteBtn id={props.task.id} showDelete={showDelete} />
      </div>
    </div>
  );
}

export default TaskElem;