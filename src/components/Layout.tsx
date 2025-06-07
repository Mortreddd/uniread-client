import { PropsWithChildren } from "react";

interface LayoutProps extends PropsWithChildren {}

export default function Layout({ children }: LayoutProps) {

  return (
  <main className={'min-h-screen w-full relative antialiased'}>
    {children}
  </main>
  );
}
