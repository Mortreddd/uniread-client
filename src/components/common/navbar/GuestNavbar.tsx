import { useRef } from "react";
import { motion } from "motion/react";
import ExploreDropdown from "../dropdown/ExploreDropdown";
import LoginModal from "../modal/auth/LoginModal";
import { ModalRef } from "../modal/Modal";

export default function GuestNavbar() {
  const loginModalRef = useRef<ModalRef>(null);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        exit={{ opacity: 0, y: -10 }}
        className="w-full flex h-full relative justify-between items-center z-30 py-5 px-32"
      >
        <a href="/" className="text-2xl font-medium text-black font-serif">
          Uniread
        </a>
        <ul className="gap-5 items-center text-lg font-serif flex">
          <li>
            <ExploreDropdown />
          </li>
          <li className="hover:cursor-pointer w-fit relative group">
            <a href="/about">About Us</a>
            <div className="w-0 group-hover:h-0 group-hover:w-full border-b border-black transition-all duration-200 ease-in-out border-solid"></div>
          </li>
          <li className="hover:cursor-pointer w-fit relative group">
            <p onClick={() => loginModalRef.current?.open()}>Login</p>
            <div className="w-0 group-hover:h-0 group-hover:w-full border-b border-black transition-all duration-200 ease-in-out border-solid"></div>
          </li>
        </ul>
      </motion.nav>
      <LoginModal ref={loginModalRef} />
    </>
  );
}
