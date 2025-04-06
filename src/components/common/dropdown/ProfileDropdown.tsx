import Icon from "@/components/Icon";
import { Link, useNavigate } from "react-router-dom";
import Dropdown, { DropdownContentRef } from "./Dropdown.tsx";
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
      <Dropdown onClick={handleProfileClick}>
        {user?.username}
        <Icon src={defaultProfile} />
      </Dropdown>
      <Dropdown.Content ref={profileContentRef}>
        <Dropdown.Item>
          <a className="w-full" href="/settings">
            Settings
          </a>
        </Dropdown.Item>
        <Dropdown.Item>
          <a className="w-full" href={`/profile/works`}>
            Profile
          </a>
        </Dropdown.Item>
        <Dropdown.Item
          className={
            "ease-in-out duratio-200 transition-colors hover:bg-red-600 w-full hover:text-white text-black rounded"
          }
        >
          <Link to={"/"} replace className="w-full" onClick={handleLogout}>
            Logout
          </Link>
        </Dropdown.Item>
      </Dropdown.Content>
    </>
  );
}
