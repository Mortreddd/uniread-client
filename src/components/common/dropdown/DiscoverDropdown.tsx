import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import DropdownButton from "./DropdownButton";
import DropdownContent, { DropdownContentRef } from "./DropdownContent";
import DropdownItem from "./DropdownItem";

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
      <DropdownButton
        className={
          "hover:bg-gray-200 bg-transparent transition-colors duration-200 ease-in-out"
        }
        onClick={handleDropdownClick}
      >
        Discover
        {/* Discover dropdown */}
      </DropdownButton>
      <DropdownContent ref={dropdownContentRef}>
        <DropdownItem>
          <Link to="/books">Books</Link>
        </DropdownItem>
        <DropdownItem>
          <Link to="/authors">Authors</Link>
        </DropdownItem>
        <DropdownItem>
          <Link to="/genres">Genres</Link>
        </DropdownItem>
      </DropdownContent>
    </>
  );
}
