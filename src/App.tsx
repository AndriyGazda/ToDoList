import "./App.css";
import HeaderComponent from "./layout/Header/Header";
import TaskCardsSection from "./layout/Main/TaskCardsSection";

function App() {
  console.log("App render");

  return (
    <>
      <HeaderComponent />
      <TaskCardsSection />
    </>
  );
}

export default App;
