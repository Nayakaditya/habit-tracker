import React, { useState } from "react";
import Select from "react-select";
import { icons } from "../utils/icons";
import { useDispatch, useSelector } from "react-redux";
import { addHabit } from "../actions/habitActions";

export default function HabitForm() {
  const habits = useSelector((state) => state.habit.habits);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [logo, setLogo] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [showDuplicateNotification, setShowDuplicateNotification] =
    useState(false);
  const [showPatternNotification, setShowPatternNotification] = useState(false);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const regex = /^[a-zA-Z]/i;

    const lowerCaseTitle = title.toLowerCase();
    const isDuplicate = habits.some(
      (habit) => habit.title.toLowerCase() === lowerCaseTitle
    );

    if (!regex.test(title)) {
      setShowPatternNotification(true);
      setTimeout(() => {
        setShowPatternNotification(false);
      }, 5000);
      setTitle("");
      setGoal("");
      return;
    } else if (isDuplicate) {
      setShowDuplicateNotification(true);
      setTimeout(() => setShowDuplicateNotification(false), 2000);
      setTitle("");
      setGoal("");
      return;
    } else {
      setTitle("");
      setGoal("");
      setLogo("");
      dispatch(addHabit(title, goal, logo));
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }
  };

  const options = icons.map((icon) => ({
    value: icon.value,
    label: (
      <div className="flex">
        <img
          src={icon.img}
          alt={icon.value}
          style={{ marginRight: "8px", width: "20px" }}
        />
        {icon.value}
      </div>
    ),
  }));
  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col border border-violet-500 p-5 h-96 justify-between rounded"
      >
        <div className="flex flex-col gap-2">
          <input
            className="py-3 px-4 rounded border border-violet-500 focus:bg-violet-200 focus:outline-violet-600 outline-none focus:border-none font-semibold"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <input
            className="py-3 px-4 rounded border border-violet-500 focus:bg-violet-200 focus:outline-violet-600 outline-none focus:border-none"
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Goal"
            required
          />
          <Select options={options} />
        </div>
        <button
          type="submit"
          className="w-full bg-violet-500 text-white rounded py-5"
        >
          Add Now
        </button>

        {showNotification && (
          <div
            id="notification-bar"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            New habit created!
          </div>
        )}

        {showDuplicateNotification && (
          <div
            id="notification-bar"
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            This habit already exists!
          </div>
        )}

        {showPatternNotification && (
          <div
            id="pattern-notification-bar"
            className="bg-yellow-500  px-4 py-2 rounded"
          >
            Invalid title. Only alphanumeric characters and spaces are allowed.
          </div>
        )}
      </form>
    </div>
  );
}
