import ApplicationLogo from "@/shared/components/ApplicationLogo.tsx";
import { Button } from "@/shared/components/form/Button.tsx";
import { Input } from "@/shared/components/form/Input.tsx";
import { useRef } from "react";
import { ModalRef } from "../Modal.tsx";
import LoginModal from "@/features/authentication/LoginModal.tsx";
import ThemeToggle from "../ThemeToggle.tsx";
import Dropdown from "../Dropdown.tsx";
import {
  Bars3Icon,
  ChatBubbleBottomCenterIcon,
  GlobeAltIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useSidebar } from "@/contexts/SidebarContext.tsx";
import { useLayout } from "@/contexts/LayoutContext.tsx";

export default function MainNavbar() {
  const loginModalRef = useRef<ModalRef>(null);
  const { openSidebar } = useSidebar();
  const { hasSidebar } = useLayout();

  const navigations = [
    {
      icon: (
        <GlobeAltIcon
          className={"size-4 md:size-5 text-black/80 dark:text-white/80"}
        />
      ),
      path: "/",
      name: "Explore",
    },
    {
      icon: (
        <UsersIcon
          className={"size-4 md:size-5 text-black/80 dark:text-white/80"}
        />
      ),
      path: "/authors",
      name: "Authors",
    },
    {
      icon: (
        <ChatBubbleBottomCenterIcon
          className={"size-4 md:size-5 text-black/80 dark:text-white/80"}
        />
      ),
      path: "/community",
      name: "Community",
    },
  ];

  return (
    <nav className={"w-full shadow-lg bg-gray-100 dark:bg-slate-950"}>
      <div className="w-full max-w-7xl flex justify-between items-center py-2 md:py-4 px-3 md:px-5 mx-auto">
        <div className="relative inline-flex items-center gap-2 md:gap-3">
          {hasSidebar && (
            <Button
              onClick={() => openSidebar()}
              variant={"transparent"}
              className={"md:hidden"}
            >
              <Bars3Icon
                className={"size-3 text-gray-800 dark:text-gray-100"}
              />
            </Button>
          )}
          <ApplicationLogo />
          <ul className={"hidden lg:inline-flex items-center gap-3 md:gap-4"}>
            {navigations.map(({ path, name }) => (
              <li key={name} className={"inline-flex items-center"}>
                <NavItem path={path} name={name} />
              </li>
            ))}
          </ul>
          {/* Tablet View */}
          <Dropdown
            className={"inline-flex lg:hidden items-center"}
            trigger={
              <p
                className={
                  "inline-flex text-xs md:text-base font-sans text-black dark:text-white"
                }
              >
                Browse
              </p>
            }
          >
            {navigations.map(({ icon, path, name }, index) => (
              <Dropdown.Item
                key={index}
                className={
                  "text-xs md:text-sm lg:text-base font-sans inline-flex items-center"
                }
              >
                {icon}
                <NavItem path={path} name={name} />
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>

        {/* Tablet view */}
        <ul className={"inline-flex justify-end items-center gap-3 md:gap-4"}>
          <li className={"hidden md:inline-flex"}>
            <Input withSearch={true} placeholder={"Search..."} />
          </li>
          <li>
            <ThemeToggle />
          </li>
          <li>
            <Button
              variant={"primary"}
              className={"rounded text-xs md:text-base"}
              onClick={() => loginModalRef.current?.open()}
            >
              Sign In
            </Button>
          </li>
        </ul>
      </div>
      <LoginModal ref={loginModalRef} />
    </nav>
  );
}

function NavItem({ path, name }: { path: string; name: string }) {
  return (
    <a
      href={path}
      className="text-xs md:text-sm font-sans w-full group px-3 py-2 text-md text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 text-left transition-colors duration-200 ease-in-out"
    >
      {name}
      <div className="w-0 group-hover:h-0 group-hover:w-full border-b border-primary dark:border-primary-dark transition-all duration-200 ease-in-out border-solid"></div>
    </a>
  );
}
