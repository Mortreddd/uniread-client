import { RefObject, useEffect, useState } from "react";

export function useIsVisible<T extends HTMLElement>(
  ref: RefObject<T | null>,
): boolean {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const currentRef = ref.current;

    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    });

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [ref]);

  return isIntersecting;
}
