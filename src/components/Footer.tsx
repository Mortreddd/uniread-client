import ApplicationLogo from "./ApplicationLogo";

export default function Footer() {
  return (
    <footer className="w-full h-fit bg-primary font-sans divide-y-2 divide-gray-300">
      <div className="w-full grid grid-cols-2 h-fit px-4 py-8">
        <div className="flex w-full justify-center items-center">
          <ApplicationLogo />
        </div>

        <div className="flex w-full items-center justify-center">
          <h1 className="text-2xl font-serif text-center text-white font-medium">
            "We want to bring help talented writers and unique startup together"
          </h1>
        </div>
      </div>
      <div className="w-full py-2 h-fit flex items-center justify-center">
        <p className="text-md text-white font-sans font-thin">
          2023 &#169; Uniread Platform
        </p>
      </div>
    </footer>
  );
}
