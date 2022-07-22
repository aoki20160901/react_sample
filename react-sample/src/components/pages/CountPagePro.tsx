import { StoreProvider  } from "../../context/Count/CntStores";
import CntContainer from "./CountPage";
import GenericTemplate from "../templates/GenericTemplate";

const TaskPage = () => {
  return (
    <StoreProvider >
      <GenericTemplate title="">
        <CntContainer />
      </GenericTemplate>
    </StoreProvider >
  )
}

export default TaskPage