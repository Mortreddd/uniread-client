import {NavLink, Outlet} from "react-router-dom";


export default function MyStoriesSection() {

  return (
    <div className="h-fit w-2/4">
      <h1 className="block text-3xl mb-4 font-sans text-gray-700 font-semibold">
        My Stories
      </h1>
        <div className={"w-full block h-fit border-t border-l border-r border-b-0 border-primary rounded-t"}>
            <div className="flex w-full items-center px-3 gap-4 justify-start">
                <NavLink
                    to={"/stories/published"}
                    className={({isActive}) =>
                        `${
                            isActive
                                ? "border-b-2 border-solid border-primary text-primary"
                                : "text-black"
                        } text-xl font-semibold py-3`
                    }
                >
                    Published
                </NavLink>
                <NavLink
                    to={"/stories/drafts"}
                    className={({isActive}) =>
                        `${
                            isActive
                                ? "border-b-2 border-solid border-primary text-primary"
                                : "text-black"
                        } text-xl font-semibold py-3 text-black`
                    }
                >
                    Drafts
                </NavLink>
            </div>
        </div>
        <div className="relative block w-full border shadow-sm border-primary h-96 overflow-y-auto">

            <div className="relative w-full h-full p-3">
                    <Outlet/>
            </div>
        </div>
    </div>
  );
}
