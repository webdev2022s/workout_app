import { useReducer, useMemo } from "react";
import { createContext } from "react";

const WorkOutContextProvider = createContext();

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

const workTime = format(new Date());

const workout = [
  { name: "Full-body workout", numExercise: workTime === "AM" ? 9 : 8 },
  { name: "Arms + Legs", numExercise: 6 },
  { name: "Arms only", numExercise: 3 },
  { name: "Legs only", numExercise: 4 },
  { name: "Core only", numExercise: workTime === "AM" ? 5 : 3 },
];

const initialState = {
  workout: workout,
  category: Number(workout.at(0).numExercise),
  sets: Number(3),
  speed: Number(60),
  breaks: Number(5),
  duration: Number(0),
  toggle: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "category":
      return { ...state, category: action.payload };
    case "sets":
      return { ...state, sets: action.payload };
    case "speed":
      return { ...state, speed: action.payload };
    case "breaks":
      return { ...state, breaks: action.payload };
    case "duration":
      return { ...state, duration: action.payload };
    case "timer":
      return { ...state, duration: state.duration - 1 };
    case "increment":
      return { ...state, duration: Math.floor(state.duration + 1) };
    case "decrement":
      return { ...state, duration: Math.ceil(state.duration - 1) };
    case "toggle":
      return { ...state, toggle: !state.toggle };
    default:
      throw new Error("Unknown Action type");
  }
}

function WorkOutProvider({ children }) {
  const [
    { category, workout, sets, speed, breaks, duration, toggle },
    dispatch,
  ] = useReducer(reducer, initialState);

  const value = useMemo(() => {
    return {
      workout,
      category,
      sets,
      speed,
      breaks,
      duration,
      toggle,
      dispatch,
    };
  }, [category, sets, speed, breaks, workout, duration, toggle]);

  return (
    <WorkOutContextProvider.Provider value={value}>
      {children}
    </WorkOutContextProvider.Provider>
  );
}

export { WorkOutProvider, WorkOutContextProvider };
