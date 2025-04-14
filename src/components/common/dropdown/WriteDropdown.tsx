import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown, { DropdownContentRef } from "./Dropdown.tsx";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Button } from "../form/Button.tsx";

export default function WriteDropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownContentRef = useRef<DropdownContentRef>(null);
  function handleDropdownClick() {
    const nextState = !isOpen;

    if (nextState) {
      dropdownContentRef.current?.open();
    } else {
      dropdownContentRef.current?.close();
    }

    setIsOpen(nextState);
  }

  return (
    <>
      <Button
        variant={"light"}
        size={"custom"}
        className={"rounded-full p-3"}
        onClick={handleDropdownClick}
      >
        <PencilIcon className={"size-5"} />
      </Button>
      <Dropdown.Content ref={dropdownContentRef}>
        <Dropdown.Item>
          <a className="w-full" href="/books/new">
            Write
          </a>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link className="w-full" to="/stories/published">
            My Stories
          </Link>
        </Dropdown.Item>
      </Dropdown.Content>
    </>
  );
}
