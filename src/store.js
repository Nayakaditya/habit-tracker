import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./reducers/habits";
const store = configureStore({
  reducer: {
    habit: habitsReducer,
  },
});

export default store;
