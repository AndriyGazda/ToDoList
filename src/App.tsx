import "./App.css";
import LoginForm from "@/component/LoginForm/LoginForm.tsx";
import HeaderComponent from "@/pages/Header/Header";
import TaskCardsSection from "@/pages/Main/TaskCardsSection";
import { useTaskStore } from "@/store/useTaskStore.ts";
import { useEffect, useState } from "react";

function App() {
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await fetchTasks();
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      }
    })();
  }, [fetchTasks]);
  console.log("App render");

  return (
    <>
      {login ? (
        <LoginForm onLogin={()=> setLogin(false)}/>
      ) : (
        <>
          <HeaderComponent />

          {loading ? (
            <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</p>
          ) : (
            <TaskCardsSection />
          )}
        </>
      )}
    </>
  );
}

export default App;
