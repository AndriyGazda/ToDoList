import "./App.css";
import HeaderComponent from "./layout/Header/HeaderComponent";
import TaskCardsSection from "./layout/Main/TaskCardsSection";

import { useTask } from "./hooks/useTask";

function App() {
  const { tasks, addTask, editTask, deleteTask } = useTask();

  console.log("App render", tasks);

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
