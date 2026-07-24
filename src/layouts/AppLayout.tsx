import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/shared/components/Footer";
import AppNavbar from "@/shared/components/navbar/AppNavbar";
import MainNavbar from "@/shared/components/navbar/MainNavbar";
import { PropsWithChildren } from "react";

interface AppLayoutProps extends PropsWithChildren {}

export default function AppLayout({ children }: AppLayoutProps) {
  const { isLoggedIn } = useAuth();

  return (
    <Layout>
      <header className={"w-full max-h-fit relative shadow-xs z-10"}>
        {isLoggedIn() ? <AppNavbar /> : <MainNavbar />}
      </header>
      <div className={"flex-1 flex flex-col min-h-0"}>{children}</div>
    </Layout>
  );
}
