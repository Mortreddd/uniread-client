import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main
      className={
        "h-screen w-full flex flex-col relative antialiased bg-slate-50 dark:bg-slate-900"
      }
    >
      {children}
    </main>
  );
}
