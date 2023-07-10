import React, { useState } from "react";
import { Link } from "react-router-dom";
import { updateHabitStatus } from "../actions/habitActions";
import { useDispatch } from "react-redux";

const Habit = ({ habit }) => {
  const [habitState, setHabitState] = useState(habit);
  const dispatch = useDispatch();

  const handleClick = () => {
    let updatedStatus;

    if (habitState.status === "none") {
      updatedStatus = "done";
    } else if (habitState.status === "done") {
      updatedStatus = "not-done";
    } else if (habitState.status === "not-done") {
      updatedStatus = "none";
    }

    // Dispatch the action to update habit status in Redux store and Firebase
    dispatch(updateHabitStatus(habitState.id, updatedStatus));

    // Update the habit status in local state
    setHabitState({ ...habitState, status: updatedStatus });
  };

  let divClass =
    "w-5 h-5 bg-white rounded-sm border border-violet-500 cursor-pointer grid place-items-center";

  if (habitState.status === "done") {
    divClass += " done";
  } else if (habitState.status === "not-done") {
    divClass += " not-done";
  }

  return (
    <div className="bg-violet-300 w-36 h-36 flex items-center justify-between px-2 rounded-md md:w-full">
      <Link to={`/habit/${habitState.id}`}>
        {" "}
        {/* Change the link to use habitState.id */}
        <div className="flex flex-col md:flex-row md:space-x-10 cursor-pointer">
          <div>
            <img
              className="w-14"
              src={habitState.logo}
              alt={habitState.title.toLowerCase()}
            />
          </div>
          <div>
            <h2 className="text-white text-lg">{habitState.title}</h2>
            <span className="text-gray-600 hidden md:block">
              {habitState.goal}
            </span>
          </div>
        </div>
      </Link>
      <div>
        <div className={divClass} onClick={handleClick}>
          {habitState.status === "done" ? (
            <div className="flex items-center justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5610/5610944.png"
                alt="check"
              />
            </div>
          ) : habitState.status === "not-done" ? (
            <div className="flex items-center justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
                alt="cross"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Habit;
