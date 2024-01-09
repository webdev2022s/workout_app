import { useEffect, useState } from "react";

import { WorkOutProvider } from "./context/WorkoutContext";

import WorkOutCategory from "./components/WorkOutCategory";
import ToggleSound from "./components/ToggleSound";

function format(date) {
  return Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

function App() {
  const [time, setTime] = useState(format(new Date()));

  useEffect(() => {
    const id = setInterval(() => {
      setTime(format(new Date()));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <WorkOutProvider>
        <main>
          <h1>Workout Timer App</h1>
          <time>{time}</time>
          <WorkOutCategory />
          <ToggleSound />
        </main>
      </WorkOutProvider>
    </>
  );
}

export default App;
