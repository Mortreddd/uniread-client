import { PropsWithChildren } from "react";

interface BaseLayoutProps extends PropsWithChildren {}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <main className={"h-screen flex flex-col overflow-hidden"}>{children}</main>
  );
}
