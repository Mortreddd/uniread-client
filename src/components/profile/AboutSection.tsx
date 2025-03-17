import { Fragment } from "react/jsx-runtime";
import LoadingCirlce from "../LoadingCirlce";

export default function AboutSection() {
  return (
    <Fragment>
      <section className="h-full w-full">
        <h1 className="text-3xl font-bold font-sans">
          <LoadingCirlce />
        </h1>
      </section>
    </Fragment>
  );
}
