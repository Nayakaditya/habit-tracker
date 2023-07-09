import { ADD_HABIT, UPDATE_HABIT_STATUS } from "../constants/actionTypes";

// Action creator to add a new habit
export const addHabit = (title, goal, logo) => ({
  type: ADD_HABIT,
  payload: { title, goal, logo },
});

// Action creator to update the status of a habit for a specific day
export const updateHabitStatus = (habitId, day, status) => ({
  type: UPDATE_HABIT_STATUS,
  payload: {
    habitId,
    day,
    status,
  },
});
