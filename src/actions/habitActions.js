import { ADD_HABIT, UPDATE_HABIT_STATUS } from "../constants/actionTypes";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import db from "../configs/firebase";

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
export const updateHabitStatus = (id, status) => {
  return async (dispatch) => {
    try {
      const habitRef = doc(db, "habits", id);

      await updateDoc(habitRef, { status });

      dispatch({
        ttype: UPDATE_HABIT_STATUS,
        payload: {
          id,
          status,
        },
      });
    } catch (error) {
      console.log("Error in updating habit status in database: " + error);
    }
  };
};
