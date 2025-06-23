import "./App.css";
import HeaderComponent from "./layout/Header/HeaderComponent";
import TaskCardsSection from "./layout/Main/TaskCardsSection";

import { useTask } from "./hooks/useTask";

function App() {
  const { tasks, addTask, deleteTask } = useTask();

  // const { tasks, addTask, editTask, deleteTask } = useTask();

  console.log("App render", tasks);

  return (
    <>
      <HeaderComponent onAddTask={addTask} />
      <TaskCardsSection tasks={tasks} onDeleteTask={deleteTask} />
    </>
  );
}

export default App;
