import Navbar from "./components/Navbar/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HabitForm from "./components/HabitForm";
import Home from "./components/Home";
import HabitDetails from "./components/HabitDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: "add", element: <HabitForm /> },
        { path: "habit/:title", element: <HabitDetails /> },
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
