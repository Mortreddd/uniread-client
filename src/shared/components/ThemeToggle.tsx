import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Button } from "./form/Button";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <Button
      onClick={() => setIsDark(!isDark)}
      variant={"transparent"}
      className={
        "rounded-full border border-gray-300 dark:border-gray-600 p-1 md:p-2 shadow-lg"
      }
    >
      {isDark ? (
        <MoonIcon
          className={"size-4 md:size-5 dark:text-gray-300 text-gray-700"}
        />
      ) : (
        <SunIcon
          className={"size-4 md:size-5 dark:text-gray-300 text-gray-700"}
        />
      )}
    </Button>
  );
}
