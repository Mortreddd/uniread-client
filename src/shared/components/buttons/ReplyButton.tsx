import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Button } from "../form/Button";

export default function ReplyButton({
  showText = true,
}: {
  showText?: boolean;
}) {
  return (
    <Button
      size={"custom"}
      variant={"transparent"}
      className={
        "rounded md:rounded-lg inline-flex items-center text-extratiny md:text-tiny"
      }
    >
      <ArrowUturnLeftIcon
        className={"size-3 md:size-4 text-gray-700 dark:text-gray-300"}
      />
      <span className={"text-gray-600 dark:text-gray-300 ml-1.5"}>Reply</span>
    </Button>
  );
}
