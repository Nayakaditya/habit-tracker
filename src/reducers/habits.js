import { ADD_HABIT, UPDATE_HABIT_STATUS } from "../constants/actionTypes";

const initialState = {
  habits: [],
};

const habitsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_HABIT:
      return {
        ...state,
        habits: [
          ...state.habits,
          {
            id: payload.id,
            title: payload.title,
            goal: payload.goal,
            logo: payload.logo,
            status: payload.status,
          },
        ],
      };

    case UPDATE_HABIT_STATUS:
      const { id, status } = payload;
      const updatedHabits = state.habits.map((habit) => {
        if (habit.id === id) {
          return {
            ...habit,
            status,
          };
        }
        return habit;
      });

      return {
        ...state,
        habits: updatedHabits,
      };
    default:
      return state;
  }
};

export default habitsReducer;
