import { Button } from "@/shared/components/form/Button";
import heroBook from "@/assets/hero-book.png";
import {
  ArrowRightIcon,
  Bars3BottomLeftIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import mountainsImage from "@/assets/mountains.png";
import Banner from "@/shared/components/Banner";
import ReadCount from "@/shared/components/ReadCount";
import LikeCount from "@/shared/components/LikeCount";
import CollaboratorCount from "@/shared/components/CollaboratorCount";
import sampleAuthor from "@/assets/author-0.png";
import teamPlanning from "@/assets/hero-team-planning.png";
import author1 from "@/assets/author-1.png";
import author2 from "@/assets/author-2.png";
import author3 from "@/assets/author-3.png";
import author4 from "@/assets/author-4.png";
import AppLayout from "@/layouts/AppLayout";

export default function Home() {
  const authors = [
    {
      id: 1,
      fullName: "Julian Vance",
      genre: "HistoricalFiction",
      avatar: author1,
      skill:
        "Master of atmospheric period pieces and multi-layered conspiracies.",
    },
    {
      id: 2,
      fullName: "Sarah K. Chen",
      genre: "CYPERPUNK / SCIFI",
      avatar: author2,
      skill: "Creating neon-lit futures through the lens of human empathy.",
    },
    {
      id: 3,
      fullName: "Marcus Thorne",
      genre: "Modern Noir",
      avatar: author3,
      skill: "Exploring the gray areas of morality in the concrete jungle.",
    },
    {
      id: 4,
      fullName: "Maya Rodriguez",
      genre: "MagicalRealism",
      avatar: author4,
      skill: "Blurring the lines between the mundane and the miraculous.",
    },
  ];
  return (
    <AppLayout>
      <section className="w-full px-6 max-w-7xl mx-auto flex h-fit flex-col-reverse items-center gap-16 md:flex-row py-14 md:py-20 border border-solid border-red-700">
        <article className="md:w-1/2">
          <p className="text-amber-500 font-bold tracking-widest font-serif uppercase text-shadow-xs text-wrap text-xs">
            A NEW ERA OF STORYTELLING
          </p>
          <h1 className="font-newsreader text-5xl md:text-7xl leading-[1.1] text-on-surface mb-8 tracking-tight dark:text-white/80">
            Where Every Story is a{" "}
            <span className="text-wrap font-semibold text-5xl md:text-7xl text-primary dark:text-primary-light text-shadow-sm italic dark:text-primary-dark/80">
              Shared Journey
            </span>
          </h1>
          <p className="mt-2 md:mt-3 font-[Manrope] max-w-md mb-10 leading-relaxed dark:text-gray-300">
            Step into an editorial world where collaboration meets creativity.
            Join authors, shape words, and discover narratives that breathe.
          </p>
          <div className="mt-2 md:mt-3 mx-auto md:mx-0 flex justify-center md:justify-start gap-1 md:gap-2 items-center">
            <Button
              size="custom"
              variant="primary"
              className="px-5 text-lg md:px-10 py-1.5 md:py-2 rounded-lg"
            >
              Start Reading
            </Button>
            <Button
              size="custom"
              className="px-5 text-lg md:px-10 py-1.5 md:py-2 rounded-lg"
              variant="secondary"
            >
              Start Writing
            </Button>
          </div>
        </article>
        <article className="relative w-full md:w-1/2">
          <div className="aspect-4/4 rounded-xl overflow-hidden bg-surface-container-highest shadow-2xl relative z-10">
            <img
              src={heroBook}
              className="object-center object-cover size-full"
              alt="stock-pile-books"
            />
          </div>
          {/* <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10"></div> */}
          {/* <div className="absolute -top-8 -right-8 w-64 h-64 bg-tertiary/20 rounded-full blur-3xl -z-10"></div> */}
        </article>
      </section>
      <section className="w-full px-6  bg-slate-100 dark:bg-slate-800 py-8 md:py-20 relative">
        <div className="w-full leading-7 mx-auto max-w-7xl">
          <h2 className="font-newsreader leading-tight text-2xl md:text-4xl text-gray-900 dark:text-gray-100 text-wrap tracking-normal">
            Curated Naratives
          </h2>
          <div className="w-full flex justify-between items-center">
            <p className="text-gray-700 dark:text-gray-300 font-sans font-thin text-xs md:text-sm">
              Handpicked by our editorial board for depth and resonance.
            </p>
            <Button
              size={"custom"}
              variant={"transparent"}
              className={
                "border-none px-1.5 md:px-2 py-0.5 group md:py-1 inline-flex items-center gap-1 md:gap-2 transition-all duration-200 ease-in-out hover:text-shadow-lg rounded text-blue-700 dark:text-blue-400 tracking-wide text-sm md:text-base"
              }
            >
              View All Stories
              <span
                className={
                  "transition-transform group-hover:translate-x-1.5 duration-200 ease-in-out"
                }
              >
                <ArrowRightIcon className={"size-3 md:size-4"} />
              </span>
            </Button>
          </div>
        </div>
        <div className="mt-6 md:mt-10 grid grid-cols-3 grid-row-auto gap-4">
          {/* Story 1 - Editors Choice */}
          <div className="flex col-span-2 bg-white/80 dark:bg-gray-700/80 shadow-md rounded-xl overflow-hidden">
            <img
              src={mountainsImage}
              alt="mountains"
              className={"h-96 w-full object-cover"}
            />
            <div className="py-6 md:py-10 px-2 md:px-4 bg-transparent space-y-2 md:space-y-4">
              <Banner variant={"editorsChoice"}>Editor's Choice</Banner>
              <h3
                className={
                  "font-newsreader text-2xl md:text-4xl line-clamp-2 leading-tight text-black dark:text-white/90"
                }
              >
                The Silence of Azure Peak
              </h3>
              <p className="text-gray-700 dark:text-gray-300 line-clamp-3 md:line-clamp-4 text-sm md:text-base">
                A breathtaking journey through the high ridges of solitude,
                where every breathe tells a story of resilience and the quiet
                beauty of isolation. Follow the footsteps of a lone wanderer as
                they navigate the rugged terrain, discovering hidden secrets and
                forging an unbreakable bond with nature. The Silence of Azure
                Peak is a tale of self-discovery, courage, and the profound
                connection between humanity and the wild.
              </p>
              <div className="flex items-center">
                <img
                  src={sampleAuthor}
                  alt="Author"
                  className="size-8 object-contain rounded-full object-center"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2 font-semibold">
                  Elena Thorne
                </span>
              </div>
              <div className="inline-flex items-start gap-2 md:gap-4">
                <ReadCount count={1234} />
                <LikeCount count={30021} />
                <CollaboratorCount count={4} />
              </div>
            </div>
          </div>
          {/* Story 2 - Featured */}
          <div className="col-span-1 bg-white/80 dark:bg-gray-700/80 shadow-md rounded-xl overflow-hidden">
            <img
              src={mountainsImage}
              alt="mountains"
              className={"h-48 inline-block w-full object-cover"}
            />
            <div className="inline-block py-4 md:py-5 px-2 md:px-4 bg-transparent space-y-2 md:space-y-3">
              <h3
                className={
                  "font-newsreader text-xl md:text-2xl line-clamp-2 leading-tight text-black dark:text-white/90"
                }
              >
                Midnight Tides
              </h3>
              <p className="text-gray-700 dark:text-gray-300 line-clamp-1 md:line-clamp-2 text-xs md:text-sm">
                Collaborative poetry exploring the rhythm of urban nights.
              </p>
              <div className="flex items-center">
                <img
                  src={sampleAuthor}
                  alt="Author"
                  className="size-8 object-contain rounded-full object-center"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2 font-semibold">
                  Elena Thorne
                </span>
              </div>
              <div className="inline-flex items-start gap-2 md:gap-4">
                <ReadCount count={1234} />
                <LikeCount count={30021} />
                <CollaboratorCount count={4} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full px-6 py-8 md:py-20 relative">
        <div className="mx-auto max-w-7xl relative">
          <div className="rounded-3xl relative z-20 w-full overflow-hidden shadow-2xl">
            <div className="bg-blue-600 relative p-6 md:p-10 max-w-3xl">
              <h1 className="block font-newsreader text-3xl md:text-5xl text-white">
                Don't Just Read.
              </h1>
              <h1 className="block font-newsreader text-3xl md:text-5xl font-thin text-white italic">
                Co-Create.
              </h1>
              <p className="mt-4 md:mt-5 text-sm md:text-base text-white text-wrap tracking-light">
                Join "The Creative Council." Our unique collaboration feature
                allows you to join author teams to help with world-building,
                character arcs, or even historical facts-checking.
              </p>
              <div className="mt-4 md:mt-5 flex gap-4 md:gap-6 items-center">
                <div className="flex-1 p-3 md:p-5 backdrop-blur-lg rounded-lg bg-white/10">
                  <UserGroupIcon
                    className={"size-5 md:size-6 text-white/80 mb-3 md:mb-4"}
                  />
                  <h6 className="text-base md:text-lg font-semibold font-sans text-white/80 mb-3 md:mb-4">
                    Join Author Teams
                  </h6>
                  <p className="text-xs md:text-sm font-sans text-white/80 tracking-wide">
                    Apply to be a permanent collaborator on ongoing stories
                  </p>
                </div>
                <div className="flex-1 p-3 md:p-5 backdrop-blur-lg rounded-lg bg-white/10">
                  <Bars3BottomLeftIcon
                    className={"size-5 md:size-6 text-white/80 mb-3 md:mb-4"}
                  />
                  <h6 className="text-base md:text-lg font-semibold font-sans text-white/80 mb-3 md:mb-4">
                    Leave Impact Notes
                  </h6>
                  <p className="text-xs md:text-sm font-sans text-white/80 tracking-wide">
                    Shape the narrative direction through structured feedback
                    cycles.
                  </p>
                </div>
              </div>
              <Button
                variant={"custom"}
                className={
                  "bg-white text-blue-600 hover:bg-white/80 hover:text-blue-700 rounded px-3 md:px-5 py-1.5 md:py-2 mt-6 md:mt-8"
                }
                size={"custom"}
              >
                Explore Active Teams
              </Button>
            </div>
            <img
              src={teamPlanning}
              className={
                "object-cover object-center opacity-80 absolute right-0 top-0 min-w-md z-0"
              }
            />
          </div>
        </div>
      </section>
      <section
        className={
          "w-full px-6 md:px-20 py-8 md:py-20 relative bg-white/80 dark:bg-gray-700/80"
        }
      >
        <h1 className="font-newsletter text-3xl md:text-4xl text-black/80 dark:text-white/80 text-center mb-3 md:mb-5">
          The Storytellers
        </h1>
        <p className="font-sans font-thin text-base md:text-lg text-black/80 dark:text-white/80 text-center mb-5 md:mb-8">
          The visionary minds behind the most impactful shared universes on
          UniRead.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {authors.map(({ fullName, skill, genre, avatar }, index) => (
            <div className="col-span-2 md:col-span-1 gap-2" key={index}>
              <img
                src={avatar}
                className={
                  "rounded-full w-auto h-40 object-cover mb-3 md:mb-5 mx-auto"
                }
              />
              <h2 className="font-newsreader text-2xl md:text-4xl text-black dark:text-white tracking-light text-center mb-1 md:mb-3">
                {fullName}
              </h2>
              <h6 className="uppercase text-amber-600 text-sm md:text-base font-serif mb-4 md:mb-6 tracking-light text-center">
                {genre}
              </h6>
              <p className="text-center text-sm md:text-base text-gray-700 dark:text-gray-300 font-sans">
                {skill}
              </p>
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
