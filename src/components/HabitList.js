import React from "react";
import Habit from "./Habit";
import { day, date } from "../utils/Days";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HabitList() {
  const habits = useSelector((state) => state.habit.habits);

  return (
    <>
      <div className="flex justify-between text-white p-5 items-center">
        <h1 className="text-xl text-violet-500">Habits</h1>
        <div>
          <span>{day}</span>,<span> {date}</span>
        </div>
      </div>

      <>
        <div className="habitlist flex flex-col  w-[350px] items-center mx-auto xmd:w-[600px]">
          <div className="py-5 text-white grid place-items-center w-full xl:hidden">
            <Link
              to="add"
              className="bg-violet-500 px-4 py-4 rounded-md w-full hover:bg-violet-600 text-center"
            >
              + Add New Habit
            </Link>
          </div>
          <div className="habit-container grid grid-cols-2 gap-16 mb-20 md:grid-cols-1 md:w-full md:gap-8 xmd:gap-6">
            {habits.map((habit, i) => (
              <Habit key={i} habit={habit} />
            ))}
          </div>
        </div>
        <div className="py-5 text-white fixed bottom-10 right-10 sm:hidden xl:block">
          <Link
            to="add"
            className="bg-violet-500 px-4 py-4 rounded-md w-full hover:bg-violet-600"
          >
            + Add New Habit
          </Link>
        </div>
      </>
    </>
  );
}
