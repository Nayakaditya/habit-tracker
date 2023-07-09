# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)





















src
|__ components
       |__ Habit.js
       |__ HabitList.js
       |__ HabitForm.js
       |__ Home.js
|__ actions
       |__ habitAction.js
|__ reducers
       |__ habitReducer.js
App.js
index.js
store.js

Habit.js
import React from "react";

export default function Habit({ title, goal, logo }) {
  return (
    <div
      className="bg-violet-300 w-36 h-36 flex items-center justify-between
     px-2 rounded-md md:w-full"
    >
      <div className="flex flex-col md:flex-row md:space-x-10 cursor-pointer">
        <div>
          <img className="w-14" src={logo} alt="running" />
        </div>
        <div>
          <h2 className="text-white text-lg">{title}</h2>
          <describe className="text-gray-700 hidden md:block">{goal}</describe>
        </div>
      </div>
      <div>
        <div className="w-5 h-5 bg-white rounded-sm border border-violet-500 cursor-pointer"></div>
      </div>
    </div>
  );
}


HabitList.js
import React from "react";
import Habit from "./Habit";
import { day, date } from "../utils/Days";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HabitList() {
  const habits = useSelector((state) => state.habits);
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
            {Array.isArray(habits) ? (
              habits.map((habit, i) => (
                <Habit
                  key={i}
                  title={habit.title}
                  goal={habit.goal}
                  logo={habit.logo}
                />
              ))
            ) : (
              <p>No habits found.</p>
            )}
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


HabitForm.js
import React, { useState } from "react";
import Select from "react-select";
import { icons } from "../utils/icons";
import { useDispatch } from "react-redux";
import { addHabit } from "../actions/habitActions";

export default function HabitForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [icon, setIcon] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setTitle("");
    setGoal("");
    setIcon("");
    dispatch(addHabit(title, goal, icon));
  };

  const options = icons.map((icon) => ({
    value: icon.value,
    label: (
      <div className="flex">
        <img
          src={icon.img}
          alt={icon.value}
          style={{ marginRight: "8px", width: "20px" }}
        />
        {icon.value}
      </div>
    ),
  }));
  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col border border-violet-500 p-5 h-96 justify-between rounded"
      >
        <div className="flex flex-col gap-2">
          <input
            className="py-3 px-4 rounded border border-violet-500 focus:bg-violet-200 focus:outline-violet-600 outline-none focus:border-none font-semibold"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <input
            className="py-3 px-4 rounded border border-violet-500 focus:bg-violet-200 focus:outline-violet-600 outline-none focus:border-none"
            type="text"
            name="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Goal"
            required
          />
          <Select options={options} />
        </div>
        <button
          type="submit"
          className="w-full bg-violet-500 text-white rounded py-5"
        >
          Add Now
        </button>
      </form>
    </div>
  );
}

Home.js
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
        <h1 className="flex items-center justify-center h-screen animate-pulse text-2xl text-violet-600">
          Habit Tracker...
        </h1>
      )}
    </div>
  );
}


habitActions.js
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

habitReducer.js
import { ADD_HABIT, UPDATE_HABIT_STATUS } from "../constants/actionTypes";

const initialState = {
  habits: [
    {
      title: "Running",
      goal: "10 Km Daily",
      logo: "https://cdn-icons-png.flaticon.com/512/384/384276.png",
      status: "none",
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
      status: "none",
    },
    {
      title: "Yoga",
      goal: "10 Km Daily",
      logo: "https://cdn-icons-png.flaticon.com/512/2647/2647625.png",
      status: "none",
    },
    {
      title: "Reading",
      goal: "10 Km Daily",
      logo: "https://cdn-icons-png.flaticon.com/512/2436/2436882.png",
      status: "none",
    },
  ],
};

const habitsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_HABIT:
      return {
        ...state,
        habits: [...state.habits, payload],
      };

    default:
      return state;
  }
};

export default habitsReducer;


App.js
import Navbar from "./components/Navbar/Navbar";
// import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HabitForm from "./components/HabitForm";
import Home from "./components/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: "add", element: <HabitForm /> },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;


index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


store.js
import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./reducers/habits";
const store = configureStore({
  reducer: {
    habits: habitsReducer,
  },
});

export default store;


Modify the codes and my aim is to as submitting the form I should able to 

















habit_tracker_app

src
|__ actions
      |__ habitActions.js
|__ components
      |__ Navbar
            |__ Navbar.js
       |__ errorPage.js
       |__ Habit.js
       |__ HabitDetails.js
       |__ HabitForm.js
       |__ HabitList.js
       |__ Home.js
|__ constants
      |__ actionTypes.js
|__ reducers
       |__ habitReducer.js
App.js
index.js
store.js