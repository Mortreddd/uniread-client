import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Button } from "../form/Button";

export default function LikeButton({
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
      <HandThumbUpIcon
        className={"size-3 md:size-4 text-gray-700 dark:text-gray-300"}
      />
      {showText && (
        <span className={"text-gray-600 dark:text-gray-300 ml-1.5"}>Like</span>
      )}
    </Button>
  );
}
