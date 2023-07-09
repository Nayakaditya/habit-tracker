import { ADD_HABIT } from "../constants/actionTypes";
import db from "../configs/firebase";
import { addDoc, collection } from "firebase/firestore";
// Action creator to add a new habit
export const addHabit = (title, goal, logo) => {
  return async (dispatch) => {
    try {
      const habitRef = collection(db, "habits");
      const habitDoc = await addDoc(habitRef, {
        title,
        goal,
        logo,
        status: "none",
      });

      dispatch({
        type: ADD_HABIT,
        payload: {
          id: habitDoc.id,
          title,
          goal,
          logo,
          status: "none",
        },
      });
    } catch (error) {
      console.log("Error in adding habits in database: " + error);
    }
  };
};

// Action creator to update the status of a habit for a specific day
// export const updateHabitStatus = (habitId, day, status) => ({
//   type: UPDATE_HABIT_STATUS,
//   payload: {
//     habitId,
//     day,
//     status,
//   },
// });
