import useGetUserDashboard from "@/api/user/useGetUserDashboard";
import CurrentTimeline from "@/components/CurrentTimeline";
import LoadingCircle from "@/components/LoadingCirlce";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "motion/react";

export default function UserDashboard() {
  const { user: currentUser } = useAuth();

  const { loading, data } = useGetUserDashboard();

  if (loading || !data) {
    return (
      <section className="p-4 relative w-full h-full overflow-y-auto rounded-lg bg-gray-50">
        <LoadingCircle />
      </section>
    );
  }

  const {
    totalCreatedBooks,
    totalPublishedBooks,
    totalDraftBooks,
    totalFollowers,
    totalFollowings,
    totalLikes,
    totalReads,
  } = data;
  return (
    <section className="p-4 relative w-full h-full overflow-y-auto rounded-lg bg-gray-50">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            ease: "easeInOut",
            duration: 0.3,
          },
        }}
        className="relative"
      >
        <CurrentTimeline className={"inline-block my-4"} />
        <p className="text-2xl block font-serif text-zinc-800 font-semibold">
          Hello, {currentUser?.fullName ?? "Anonymous"}
        </p>
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="grid font-serif grid-cols-4 gap-4 mt-5 w-full relative"
      >
        <article className="col-span-1 row-span-1 rounded-lg bg-zinc-200 p-4">
          <h2 className="text-gray-800 font-medium text-md">Total Books</h2>
          <p className="mt-2 font-font-semibold text-3xl text-gray-800">
            {totalCreatedBooks}
          </p>
        </article>
        <article className="col-span-1 row-span-1 rounded-lg bg-zinc-200 p-4">
          <h2 className="text-gray-800 font-medium text-md">Published Books</h2>
          <p className="mt-2 font-font-semibold text-3xl text-gray-800">
            {totalPublishedBooks}
          </p>
        </article>
        <article className="col-span-1 row-span-1 rounded-lg bg-zinc-200 p-4">
          <h2 className="text-gray-800 font-medium text-md">Drafts</h2>
          <p className="mt-2 font-font-semibold text-3xl text-gray-800">
            {totalDraftBooks}
          </p>
        </article>
        <article className="col-span-1 row-span-1 rounded-lg bg-zinc-200 p-4">
          <h2 className="text-gray-800 font-medium text-md">Total Likes</h2>
          <p className="mt-2 font-font-semibold text-3xl text-gray-800">
            {totalLikes}
          </p>
        </article>

        <article className="col-span-1 row-span-1 rounded-lg bg-zinc-200 p-4">
          <h2 className="text-gray-800 font-medium text-md">Reads</h2>
          <p className="mt-2 font-font-semibold text-3xl text-gray-800">
            {totalReads}
          </p>
        </article>
        <article className="col-span-1 row-span-1 rounded-lg bg-zinc-200 p-4">
          <h2 className="text-gray-800 font-medium text-md">Followers</h2>
          <p className="mt-2 font-font-semibold text-3xl text-gray-800">
            {totalFollowers}
          </p>
        </article>
        <article className="col-span-1 row-span-1 rounded-lg bg-zinc-200 p-4">
          <h2 className="text-gray-800 font-medium text-md">Following</h2>
          <p className="mt-2 font-font-semibold text-3xl text-gray-800">
            {totalFollowings}
          </p>
        </article>
      </motion.div>
    </section>
  );
}
