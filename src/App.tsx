import "./App.css";
import HeaderComponent from "./layout/Header/HeaderComponent";
import TaskCardsSection from "./layout/Main/TaskCardsSection";

import { useTask } from "./hooks/useTask";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tasks, addTask, editTask, deleteTask } = useTask();

  console.log("App render", tasks);

  return (
    <>
      <HeaderComponent onAddTask={addTask} />
      <TaskCardsSection tasks={tasks} />
    </>
  );
}

export default App;
