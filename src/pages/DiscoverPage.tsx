import Navbar from "@/components/common/navbar/Navbar";
import { useState } from "react";

type Discover = "authors" | "books" | "genres";
export default function DiscoverPage() {
  // TODO: remove the @ts-ignore comment before deploying the application
  // @ts-ignore
  const selectedDiscover = useState<Discover | null>(null);
  return (
    <>
      <div className="w-full min-h-screen flex flex-col">
        <Navbar />
        <div className="w-full h-full flex flex-1"></div>
      </div>
    </>
  );
}
