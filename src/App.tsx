import "./App.css";
import HeaderComponent from "./layout/Header/HeaderComponent";
import TaskCardsSection from "./layout/Main/TaskCardsSection";

import { useTask } from "./hooks/useTask";

function App() {
  const { task, addTask, editTask, deleteTask } = useTask();
  console.log("App render", task);

  return (
    <>
      <HeaderComponent onAddTask={addTask} />
      <TaskCardsSection />
    </>
  );
}

export default App;
