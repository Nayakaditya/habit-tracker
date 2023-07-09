import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="bg-violet-500 fixed bottom-0 w-full md:relative">
        <ul className="flex justify-between items-center py-5 md:justify-around lg:justify-center lg:space-x-6">
          <Link to="/add">
            <li className="text-white ml-5">Add</li>
          </Link>

          <Link to="/">
            <li className="text-white">
              <img
                className="lg:hidden"
                width="25"
                src="https://cdn-icons-png.flaticon.com/512/1946/1946436.png "
                alt="home"
              />
              <span className="sm:hidden lg:block">Home</span>
            </li>
          </Link>
          <li className="text-white mr-5">Back</li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
