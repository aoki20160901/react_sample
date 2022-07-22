import * as React from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import Footer from "./Footer";

const TaskPage = () => {
  return (
    <>
      <AddTodo />
      <TodoList />
      <Footer />
    </>
  );
}
export default TaskPage