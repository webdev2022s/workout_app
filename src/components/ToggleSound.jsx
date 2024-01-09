import { memo } from "react";
import useWorkout from "../hooks/useWorkout";

function ToggleSound() {
  const { dispatch, toggle } = useWorkout();
  return (
    <button className="btn-sound" onClick={() => dispatch({ type: "toggle" })}>
      {toggle ? "🔊" : "🔇"}
    </button>
  );
}

export default memo(ToggleSound);
