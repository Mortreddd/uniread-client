import { NavLink, Outlet } from "react-router-dom";

export default function ProfileDescription() {

  return (
    <>
      <div className="w-full h-full">
        <div className="w-full h-fit shadow-lg px-10 bg-white flex justify-between items-center">
          <div className="h-fit flex items-center justify-start gap-10">
            <NavLink
              to="/profile/works"
              className={({ isActive }) =>
                `${
                  isActive ? "border-b-2 border-solid border-primary" : ""
                } text-xl font-bold py-2 px-4 text-black`
              }
            >
              Works
            </NavLink>
            <NavLink
              // Replace with the actual usernmae
              to="/profile/about"
              className={({ isActive }) =>
                `${
                  isActive ? "border-b-2 border-solid border-primary" : ""
                } text-xl font-bold py-2 px-4 text-black`
              }
            >
              About
            </NavLink>
          </div>

        </div>
        <div className="w-full h-fit">
          <Outlet />
        </div>
      </div>
    </>
  );
}
