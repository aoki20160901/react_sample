import { TaskProvider } from "../../context/Task/TaskContext";
import TaskContainer from "../tasks/TaskContainer";
import GenericTemplate from "../templates/GenericTemplate";

const TaskPage = () => {
  return (
    <TaskProvider>
      <GenericTemplate title="ログイン">
        <TaskContainer />
      </GenericTemplate>
    </TaskProvider>
  )
}

export default TaskPage