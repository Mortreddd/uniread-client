import Icon from "@/components/Icon";
import { Link, useNavigate } from "react-router-dom";
import DropdownButton from "./DropdownButton";
import DropdownContent, { DropdownContentRef } from "./DropdownContent";
import DropdownItem from "./DropdownItem";
import { useRef, useState } from "react";
import defaultProfile from "@/assets/profiles/default-profile.jpg";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfileDropdown() {
  const [open, setOpen] = useState<boolean>(false);
  const profileContentRef = useRef<DropdownContentRef>(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  function handleProfileClick() {
    if (open) {
      profileContentRef.current?.close();
    } else {
      profileContentRef.current?.open();
    }
    setOpen(!open);
  }

  function handleLogout() {
    navigate("/");
    logout();
  }

  return (
    <>
      <DropdownButton onClick={handleProfileClick}>
        {user?.firstName}
        <Icon src={defaultProfile} />
      </DropdownButton>
      <DropdownContent ref={profileContentRef}>
        <DropdownItem>
          <Link to="/settings">Settings</Link>
        </DropdownItem>
        <DropdownItem>
          <Link to={`/profile/works`}>Profile</Link>
        </DropdownItem>
        <DropdownItem
          className={
            "ease-in-out duratio-200 transition-colors hover:bg-red-600 w-full hover:text-white text-black rounded"
          }
        >
          <Link to={"/"} replace onClick={handleLogout}>
            Logout
          </Link>
        </DropdownItem>
      </DropdownContent>
    </>
  );
}
