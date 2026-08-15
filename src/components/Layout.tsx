import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main
      className={
        "h-screen overflow-y-auto w-full flex flex-col min-h-0 relative antialiased bg-slate-50 dark:bg-slate-900"
      }
    >
      {children}
    </main>
  );
}
