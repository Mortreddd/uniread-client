import { useEffect, useState } from "react";

interface ScrollPositionProps {
  scrollX: number;
  scrollY: number;
}

export default function useScrollPosition() {
  const [scroll, setScroll] = useState<ScrollPositionProps>({
    scrollX: 0,
    scrollY: 0,
  });

  function onScroll() {
    setScroll({ scrollX: window.scrollX, scrollY: window.scrollY });
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return scroll;
}
