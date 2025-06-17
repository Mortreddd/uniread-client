export default function LoadingScreen() {
  return (
    <main className={"w-screen h-screen bg-white"}>
      <div className={"flex w-full h-full items-center justify-center gap-5"}>
        {[0, 100, 200, 300, 400].map((delay, index) => (
          <div
            key={index}
            className="size-8 bg-primary rounded-full animate-bounce transition-all ease-in-out"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </main>
  );
}
