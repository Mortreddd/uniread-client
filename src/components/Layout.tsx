import { PropsWithChildren, useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen.";

interface LayoutProps extends PropsWithChildren {}

export default function Layout({ children }: LayoutProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [unloading, setUnloading] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("load", () => {
      setLoading(false);
    });
    window.addEventListener("beforeunload", () => {
      setLoading(true);
      setUnloading(true);
    });

    return () => {
      window.removeEventListener("load", () => {
        setLoading(false);
      });
      window.removeEventListener("beforeunload", () => {
        setLoading(true);
        setUnloading(true);
      });
    };
  }, []);

  return (
    <>
      {loading || unloading ? (
        <LoadingScreen />
      ) : (
        <main
          className={
            "min-h-screen w-full relative antialiased overflow-y-hidden"
          }
        >
          {children}
        </main>
      )}
    </>
  );
}
