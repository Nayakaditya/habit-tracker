import React from "react";
import HabitList from "./HabitList";
import { useState, useEffect } from "react";

export default function Home() {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShow(true);
    }, 2000);
  }, []);
  return (
    <div className="bg-transparent">
      {isShow ? (
        <HabitList />
      ) : (
        <h1
          id="ht-text"
          className="flex items-center justify-center h-screen text-2xl text-violet-600"
        >
          Habit Tracker
        </h1>
      )}
    </div>
  );
}
