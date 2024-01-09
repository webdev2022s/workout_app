import { useContext } from "react";
import { WorkOutContextProvider } from "../context/WorkoutContext";

export default function useWorkout() {
  const context = useContext(WorkOutContextProvider);
  if (context === undefined) throw new Error("Context is out of range!");
  return context;
}
