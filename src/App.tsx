import "./App.css";
import HeaderComponent from "./layout/Header/Header";
import TaskCardsSection from "./layout/Main/TaskCardsSection";

import { TaskProvider } from "./context/TaskProvider";

function App() {
  console.log("App render");

  return (
    <TaskProvider>
      <HeaderComponent />
      <TaskCardsSection />
    </TaskProvider>
  );
}

export default App;
