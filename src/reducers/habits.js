import { ADD_HABIT } from "../constants/actionTypes";

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

    default:
      return state;
  }
};

export default habitsReducer;
