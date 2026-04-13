import AuthenticatedNavbar from "@/components/common/navbar/AuthenticatedNavbar";
import AppLayout from "@/layouts/AppLayout";
import {
  BellIcon,
  DocumentTextIcon,
  LanguageIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { motion } from "motion/react";
import { NavLink, Outlet } from "react-router-dom";

interface NavLinkItem {
  to: string;
  icon: React.ElementType;
  text: string;
}

export default function BasePage() {
  const personalLinks: NavLinkItem[] = [
    {
      to: "/settings/profile",
      icon: UserIcon,
      text: "Profile",
    },
    {
      to: "/settings/password",
      icon: LockClosedIcon,
      text: "Password",
    },
    {
      to: "/settings/data",
      icon: DocumentTextIcon,
      text: "Data",
    },
  ];

  const preferencesLinks: NavLinkItem[] = [
    {
      to: "/settings/preferences/language",
      icon: LanguageIcon,
      text: "Language",
    },
    {
      to: "/settings/preferences/notifications",
      icon: BellIcon,
      text: "Notifications",
    },
  ];

  return (
    <AppLayout>
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
        <header className="w-full shrink-0">
          <AuthenticatedNavbar />
        </header>
        <div className="w-full flex-1 min-h-0 pt-2 px-10 flex overflow-y-auto">
          <div className="font-serif flex-1 flex">
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
                  <ul className="w-full p-1 space-y-1">
                    {personalLinks.map(({ to, icon: Icon, text }, index) => (
                      <li className="relative w-full" key={index}>
                        <NavLink
                          to={to}
                          className={({ isActive }) =>
                            `flex items-center p-2 rounded transition-all duration-200 ${
                              isActive
                                ? "bg-primary text-white"
                                : "text-primary hover:bg-primary hover:text-white"
                            }`
                          }
                        >
                          <Icon className="size-5 mr-2" />
                          <span>{text}</span>
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
                  <ul className="w-full p-1 space-y-1">
                    {preferencesLinks.map(({ to, icon: Icon, text }, index) => (
                      <li className="relative w-full" key={index}>
                        <NavLink
                          to={to}
                          className={({ isActive }) =>
                            `flex items-center p-2 rounded transition-all duration-200 ${
                              isActive
                                ? "bg-primary text-white"
                                : "text-primary hover:bg-primary hover:text-white"
                            }`
                          }
                        >
                          <Icon className="size-5 mr-2" />
                          <span>{text}</span>
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
              className={"relative flex-1 min-h-0 bg-gray-50"}
            >
              <Outlet />
            </motion.div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
