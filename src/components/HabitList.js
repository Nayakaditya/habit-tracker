import React from "react";
import Habit from "./Habit";
import { day, date } from "../utils/Days";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../configs/firebase";

export default function HabitList() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const habitsRef = collection(db, "habits");
        const snapshot = await getDocs(habitsRef);
        const habitData = snapshot.docs.map((doc) => doc.data());
        setHabits(habitData.sort());
      } catch (error) {
        console.log("error in fetching data : ", error);
      }
    };

    fetchHabits();
  }, []);

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
