import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format, addDays, isSameDay } from "date-fns";
import { doc, getDoc } from "firebase/firestore";
import db from "../configs/firebase";

const HabitDetails = () => {
  const { id } = useParams();
  const [habitData, setHabitData] = useState(null); // State to store the habit data

  useEffect(() => {
    const fetchHabitData = async () => {
      // Create a reference to the habit document with the matching ID
      const habitRef = doc(db, "habits", id);

      try {
        // Get the habit document
        const habitDoc = await getDoc(habitRef);

        if (habitDoc.exists()) {
          const habitData = habitDoc.data();
          // Set the habit data in the state
          setHabitData(habitData);
        } else {
          // If the document doesn't exist, handle the error
          console.log("Habit not found");
        }
      } catch (error) {
        console.error("Error fetching habit:", error);
      }
    };

    fetchHabitData();
  }, [id]);

  if (!habitData) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-3xl">
        Habit Not Found
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
        <h1 className="text-white text-3xl">{habitData.title}</h1>
        <img
          width={50}
          src={habitData.logo}
          alt={habitData.title.toLowerCase()}
        />
      </div>
      <div className="mt-5 flex justify-center items-center gap-5">
        <div>
          <h2 className="text-white text-lg">7-Day Calendar:</h2>
          <div className="flex gap-2 mt-2">
            {calendarDates.map((date) => {
              const formattedDate = format(date, "d");
              const isCompleted = isSameDay(date, currentDate);
              const status = isCompleted ? habitData.status : "none";

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
