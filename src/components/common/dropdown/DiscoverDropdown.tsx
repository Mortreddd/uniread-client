import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown, { DropdownContentRef } from "./Dropdown.tsx";

export default function DiscoverDropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownContentRef = useRef<DropdownContentRef>(null);
  function handleDropdownClick() {
    if (isOpen) {
      dropdownContentRef.current?.open();
    } else {
      dropdownContentRef.current?.close();
    }
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Dropdown
        className={
          "hover:bg-gray-200 bg-transparent transition-colors duration-200 ease-in-out"
        }
        onClick={handleDropdownClick}
      >
        Discover
        {/* Discover dropdown */}
      </Dropdown>
      <Dropdown.Content ref={dropdownContentRef}>
        <Dropdown.Item>
          <Link className="w-full" to="/books">
            Books
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link className="w-full" to="/authors">
            Authors
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link className="w-full" to="/genres">
            Genres
          </Link>
        </Dropdown.Item>
      </Dropdown.Content>
    </>
  );
}
