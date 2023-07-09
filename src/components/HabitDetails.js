import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { format, addDays, isSameDay } from "date-fns";

const HabitDetails = () => {
  const { title } = useParams();
  const habits = useSelector((state) => state.habit.habits);
  const habit = habits.find((habit) => habit.title === title);

  if (!habit) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-3xl">
        Habit not found
      </div>
    );
  }

  const currentDate = new Date();
  const calendarDates = [];
  for (let i = 0; i < 7; i++) {
    const date = addDays(currentDate, i);
    calendarDates.push(date);
  }

  return (
    <div className="mt-5">
      <div className="flex justify-center items-center gap-5">
        <h1 className="text-white text-3xl">{habit.title}</h1>
        <img width={50} src={habit.logo} alt={habit.title.toLowerCase()} />
      </div>
      <div className="mt-5 flex justify-center items-center gap-5">
        <div>
          <h2 className="text-white text-lg">7-Day Calendar:</h2>
          <div className="flex gap-2 mt-2">
            {calendarDates.map((date) => {
              const formattedDate = format(date, "d");
              const isCompleted = isSameDay(date, currentDate);
              const status = isCompleted ? habit.status : "none";

              return (
                <div
                  key={formattedDate}
                  className={`w-10 h-10 flex items-center justify-center bg-white rounded-sm ${
                    status === "done"
                      ? "done"
                      : status === "not-done"
                      ? "not-done"
                      : ""
                  }`}
                >
                  {isCompleted && (
                    <img
                      width={20}
                      className="grid place-items-center"
                      src={
                        status === "done"
                          ? "https://cdn-icons-png.flaticon.com/512/5610/5610944.png"
                          : "https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
                      }
                      alt={status === "done" ? "check" : "cross"}
                    />
                  )}
                  {formattedDate}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitDetails;
