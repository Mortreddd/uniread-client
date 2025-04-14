import Navbar from "@/components/common/navbar/Navbar";
import MyStoriesSection from "@/components/write/MyStoriesSection";

export default function MyStoriesPage() {
  return (
    <div className="h-screen w-full antialiased">
      <div className="w-full h-fit">
        <Navbar />
      </div>
      <div className="h-4/5 w-full flex justify-center items-center">
        <MyStoriesSection />
      </div>
    </div>
  );
}
