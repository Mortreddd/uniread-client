import { useEffect } from "react";

export default function LoadingScreen() {

  const delay = 2000; // 2seconds

  useEffect(() => {
    setTimeout(function() {
      
    }, delay)
  }, [])
  return (
    <main className="h-screen bg-white flex justify-center items-center w-full antialiased">
      <div className="flex items-center gap-4">
        <div className="size-10 bg-primary rounded-full ball-bounce"></div>
        <div className="size-10 bg-primary rounded-full ball-bounce"></div>
        <div className="size-10 bg-primary rounded-full ball-bounce"></div>
        <div className="size-10 bg-primary rounded-full ball-bounce"></div>
        <div className="size-10 bg-primary rounded-full ball-bounce"></div>
      </div>
    </main>
  );
}
