export default function LoadingScreen() {
  return (
    <main className={"w-screen h-screen bg-gray-100 dark:bg-slate-800"}>
      <div className={"flex w-full h-full items-center justify-center gap-5"}>
        {[0, 100, 200, 300, 400].map((delay, index) => (
          <div
            key={index}
            className="size-4 md:size-7 bg-primary dark:bg-primary-dark rounded-full animate-bounce transition-all ease-in-out"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </main>
  );
}
