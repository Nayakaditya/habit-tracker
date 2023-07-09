import { ADD_HABIT } from "../constants/actionTypes";

const initialState = {
  habits: [
    {
      title: "Running",
      goal: "10 Km Daily",
      logo: "https://cdn-icons-png.flaticon.com/512/384/384276.png",
      status: "done",
    },
    {
      title: "Swimming",
      goal: "Daily",
      logo: "https://cdn-icons-png.flaticon.com/512/2264/2264829.png",
      status: "none",
    },
    {
      title: "Cycling",
      goal: "15 Km MWF",
      logo: "https://cdn-icons-png.flaticon.com/512/983/983534.png",
      status: "not-done",
    },
    {
      title: "Yoga",
      goal: "20 Min for 5 different",
      logo: "https://cdn-icons-png.flaticon.com/512/2647/2647625.png",
      status: "done",
    },
    {
      title: "Reading",
      goal: "30 Min",
      logo: "https://cdn-icons-png.flaticon.com/512/2436/2436882.png",
      status: "done",
    },
  ],
};

const habitsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_HABIT:
      return {
        ...state,
        habits: [
          ...state.habits,
          {
            title: payload.title,
            goal: payload.goal,
            logo: payload.logo,
            status: (payload.status = "none"),
          },
        ],
      };

    default:
      return state;
  }
};

export default habitsReducer;
