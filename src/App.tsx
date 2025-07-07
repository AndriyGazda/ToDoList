import "./App.css";
import { useTask } from "./hooks/useTask";
import HeaderComponent from "./layout/Header/Header";
import TaskCardsSection from "./layout/Main/TaskCardsSection";

function App() {
  const { tasks, addTask, editTask, deleteTask } = useTask();
  console.log("App render");

  return (
    <>
      <HeaderComponent onAddTask={addTask} />
      <TaskCardsSection
        tasks={tasks}
        onEditTask={editTask}
        onDeleteTask={deleteTask}
      />
    </>
  );
}

export default App;
