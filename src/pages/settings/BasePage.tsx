import AuthenticatedNavbar from "@/components/common/navbar/AuthenticatedNavbar";
import {
  BellIcon,
  DocumentTextIcon,
  LanguageIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { motion } from "motion/react";
import { NavLink, NavLinkProps, Outlet } from "react-router-dom";

interface NavLinkItem extends NavLinkProps {
  icon: JSX.Element;
  text: string;
}

export default function BasePage() {
  const personalLinks: NavLinkItem[] = [
    {
      to: "/settings/profile",
      icon: (
        <UserIcon className="size-5 text-primary mr-2 group-hover:text-white transition-colors duration-200" />
      ),
      text: "Profile",
    },
    {
      to: "/settings/password",
      icon: (
        <LockClosedIcon className="size-5 text-primary mr-2 group-hover:text-white transition-colors duration-200" />
      ),
      text: "Password",
    },
    {
      to: "/settings/data",
      icon: (
        <DocumentTextIcon className="size-5 text-primary mr-2 group-hover:text-white transition-colors duration-200" />
      ),
      text: "Data",
    },
  ];

  const preferencesLinks: NavLinkItem[] = [
    {
      to: "/settings/preferences/language",
      icon: (
        <LanguageIcon className="size-5 text-primary mr-2 group-hover:text-white transition-colors duration-200" />
      ),
      text: "Language",
    },
    {
      to: "/settings/preferences/notifications",
      icon: (
        <BellIcon className="size-5 text-primary mr-2 group-hover:text-white transition-colors duration-200" />
      ),
      text: "Notifications",
    },
  ];

  return (
    <>
      <header className="w-full relative">
        <AuthenticatedNavbar />
      </header>
      <div className="w-full min-h-[80vh] h-fit pt-2 px-10 flex justify-center items-start">
        <div className="font-serif min-w-[80vw] mx-auto min-h-[80vh]">
          <div className="min-w-xs h-fit inline-block mr-6 top-0 sticky">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="relative mb-3"
            >
              <h1 className="my-3 font-medium text-gray-800 inline-block text-2xl">
                Settings
              </h1>
              <div className="relative rounded border divide-gray-200 min-w-xs divide-y-2 shadow-lg">
                <h1 className="text-xl font-medium text-gray-800 p-2">
                  Personal
                </h1>
                <ul className="w-full p-1">
                  {personalLinks.map(({ to, icon, text }, index) => (
                    <li className="relative w-full" key={index}>
                      <NavLink
                        to={to}
                        className="text-md text-primary flex items-center relative group p-2" // Added group class
                      >
                        {icon}
                        <span className="group-hover:text-white transition-colors duration-200">
                          {text}
                        </span>
                        <span className="absolute inset-0 transition-all duration-200 ease-in-out rounded group-hover:bg-primary/80 bg-transparent -z-10"></span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <h1 className="my-3 font-medium text-gray-800 inline-block text-2xl">
                System
              </h1>
              <div className="relative rounded border divide-gray-200 min-w-xs divide-y-2 shadow-lg">
                <h1 className="text-xl font-medium text-gray-800 p-2">
                  Preferences
                </h1>
                <ul className="w-full p-1">
                  {preferencesLinks.map(({ to, icon, text }, index) => (
                    <li className="relative w-full" key={index}>
                      <NavLink
                        to={to}
                        className="text-md text-primary flex items-center relative group p-2" // Added group class
                      >
                        {icon}
                        <span className="group-hover:text-white transition-colors duration-200">
                          {text}
                        </span>
                        <span className="absolute inset-0 transition-all duration-200 ease-in-out rounded group-hover:bg-primary/80 bg-transparent -z-10"></span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={"float-right w-[60vw]"}
          >
            <div className="min-h-[80vh] p-2 bg-white rounded shadow">
              <Outlet />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
