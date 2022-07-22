import React from 'react';
import { Task } from '../../context/Task/Interfaces';
import TaskElem from './TaskElem';

interface IProps {
  tasks: Array<Task>
}
function ListTask(props: IProps) {

  return (
    <div className="flex-body">
      {props.tasks.filter((e: Task) => !e.deleteflg)
        .map(task =>
          <TaskElem
            key={task.id}
            task={task}
          ></TaskElem>
        )
      }
    </div>
  );
}

export default ListTask;