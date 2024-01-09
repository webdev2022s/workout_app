import { memo, useEffect } from "react";
import useWorkout from "../hooks/useWorkout";
import clickSound from "../data/sound.wav";

const WorkOutCategory = memo(function WorkOutCategory() {
  const { category, workout, dispatch, sets, speed, breaks, duration, toggle } =
    useWorkout();

  useEffect(() => {
    dispatch({
      type: "duration",
      payload: category * sets * speed + (sets - 1) * breaks,
    });
  }, [category, sets, speed, breaks, dispatch]);

  const mins = Math.floor(duration / 60);
  const secs = duration % 60;

  useEffect(() => {
    const id = setInterval(() => {
      if (duration === 0) return 0;
      dispatch({ type: "timer" });
    }, 1000);
    return () => clearInterval(id);
  }, [duration, dispatch]);

  useEffect(() => {
    if (!toggle) return;
    const sound = new Audio(clickSound);
    sound.play();
  }, [duration, toggle]);

  if (duration === 0) return <h1>Finish Workout!</h1>;
  return (
    <>
      <form>
        <div>
          <label htmlFor="category">Workout Category Set :</label>
          <select
            id="category"
            value={workout.numExercise}
            onChange={(e) =>
              dispatch({ type: "category", payload: Number(e.target.value) })
            }
          >
            {workout.map((workouts) => (
              <option key={workouts.name} value={workouts.numExercise}>
                {workouts.name} : {workouts.numExercise}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sets">How Many Sets? </label>
          <input
            id="sets"
            type="range"
            min={1}
            max={5}
            value={sets}
            onChange={(e) =>
              dispatch({ type: "sets", payload: Number(e.target.value) })
            }
          />{" "}
          <span>{sets}</span>
        </div>
        <div>
          <label htmlFor="speed">How fast are you?</label>
          <input
            type="range"
            id="speed"
            value={speed}
            min={30}
            max={180}
            step={30}
            onChange={(e) =>
              dispatch({ type: "speed", payload: Number(e.target.value) })
            }
          />
          <span>{speed} sec/set of exercise</span>
        </div>
        <div>
          <label htmlFor="breaks">Break / Rest</label>
          <input
            type="range"
            id="breaks"
            min={5}
            max={60}
            step={5}
            value={breaks}
            onChange={(e) =>
              dispatch({ type: "breaks", payload: Number(e.target.value) })
            }
          />
          <span>{breaks} sec / break of set</span>
        </div>
      </form>
      <section>
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>
        <p>
          {mins < 10 && "0"}
          {mins}: {secs < 10 && "0"}
          {secs}
        </p>
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
      </section>
    </>
  );
});

export default WorkOutCategory;
