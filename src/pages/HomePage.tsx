import { Button } from "@/components/common/form/Button";
import headline1 from "@/assets/headline-image-1.jpg";
import headline2 from "@/assets/headline-image-2.jpg";
import { motion } from "motion/react";
import Footer from "@/components/Footer";
import Navbar from "@/components/common/navbar/Navbar.tsx";

export default function Home() {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden -z-50">
        <div className="absolute w-[40rem] h-[40rem] bg-[#C291AE] rounded-full blur-[100px] -top-60 -left-60"></div>
        <div className="absolute w-[40rem] h-[40rem] bg-[#C291AE] rounded-full blur-[100px] -right-80"></div>
      </div>
      <header className={"w-full relative"}>
        <Navbar />
      </header>
      <section className="w-full h-[calc(100vh-80px)] flex justify-center items-center relative">
        <div className="w-full px-32 pt-16 font-serif h-full flex justify-center ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 1.3,
                ease: "easeInOut",
              },
            }}
            className="inline-flex items-center flex-col gap-5"
          >
            <h1 className="text-6xl font-serif text-semibold">
              Join the Next Generation
            </h1>
            <h1 className="text-6xl font-serif text-semibold">of</h1>
            <p className="text-6xl font-bold text-primary font-salsa">
              StoryTellers
            </p>
            <p className="text-xl mt-4 font-serif text-black text-center">
              Start your next chapter with powerful writing tools, creative
              freedom, and collaboration at your fingertips.
            </p>
            <Button
              className="rounded-full mt-10 font-salsa border-primary border hover:border-white text-primary bg-white hover:text-white hover:bg-primary px-10 py-3 text-xl"
              variant={"custom"}
              size={"custom"}
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </section>
      <section className="relative px-32 py-5 w-full mt-32">
        <div className="absolute inset-0 -z-50">
          <div className="absolute w-[40rem] h-[40rem] bg-[#C291AE] rounded-full blur-[100px] -left-60"></div>
        </div>
        <div className="relative w-full h-full flex items-center justify-between">
          <motion.img
            src={headline1}
            alt="headline-image"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 1.2 } }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="h-80 rounded-lg shadow-xl object-cover object-center aspect-video"
          />
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 1.6 } }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative inline-flex flex-col gap-5 w-fit max-w-xl"
          >
            <h2 className="text-3xl font-serif text-black font-semibold">
              Where imagination meets expression
            </h2>
            <p className="text-lg font-serif text-black gap-10">
              Step into a universe painted with possibility—where every detail
              sparks inspiration and every color tells a story. Here, your ideas
              don`t just exist—they flourish. Let your creativity flow through
              dynamic visuals and expressive storytelling, creating a world that
              reflects your voice, your vision, and your limitless potential.
              Whether you write to dream, to connect, or to escape, this is your
              canvas—vivid, inviting, and entirely yours.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="relative px-32 py-5 w-full mt-32">
        <div className="relative w-full h-full flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 1.6 } }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative inline-flex flex-col gap-5 w-fit max-w-xl"
          >
            <h2 className="text-3xl font-serif text-black font-semibold">
              Painted Dreams, Written Realities
            </h2>
            <p className="text-lg font-serif text-black gap-10">
              Transform your thoughts into words as you journey through a world
              bursting with color, creativity, and boundless potential. Let your
              imagination take the lead as you explore vivid landscapes where
              every swirl and stroke inspires a new idea. In this realm of
              artistic freedom, stories unfold effortlessly—powered by emotion,
              guided by vision, and crafted with purpose. Whether you're
              starting your first tale or shaping your next masterpiece, this is
              the space where your inner storyteller truly comes alive.
            </p>
          </motion.div>
          <motion.img
            src={headline2}
            alt="headline-image"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 1.2 } }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="h-80 rounded-lg shadow-xl object-cover object-center aspect-video"
          />
        </div>
      </section>
      <section className="relative px-32 py-5 w-full mt-32 isolate">
        <div className="absolute size-96 bg-[#C291AE] rounded-full blur-[100px] inset-0 -z-50"></div>
        <h1 className="text-center w-full block font-salsa text-4xl mb-8 text-gray-800 font-bold">
          Features
        </h1>
        <div className="grid w-full gap-5 grid-cols-2 grid-flow-col md:grid-cols-4 sm:grid-cols-1 ">
          <article className="rounded-xl shadow-xl w-full h-full p-8 bg-transparent">
            <h1 className="block text-xl font-serif font-bold">
              Write & Share Stories
            </h1>
            <p className="mt-2 text-lg font-serif font-thin">
              Bring your imagination to life with an intuitive writing interface
              built for both first-time writers and seasoned authors. Publish
              stories chapter by chapter, add covers and genres, and share them
              with a growing community of readers who love discovering new
              voices.
            </p>
          </article>
          <article className="rounded-xl shadow-xl w-full h-full p-8 bg-transparent">
            <h1 className="block text-xl font-serif font-bold">
              Collaborate Real Time
            </h1>
            <p className="mt-2 text-lg font-serif font-thin">
              Bring your imagination to life with an intuitive writing interface
              built for both first-time writers and seasoned authors. Publish
              stories chapter by chapter, add covers and genres, and share them
              with a growing community of readers who love discovering new
              voices.
            </p>
          </article>
          <article className="rounded-xl shadow-xl w-full h-full p-8 bg-transparent">
            <h1 className="block text-xl font-serif font-bold">
              Connect Through Messaging
            </h1>
            <p className="mt-2 text-lg font-serif font-thin">
              Bring your imagination to life with an intuitive writing interface
              built for both first-time writers and seasoned authors. Publish
              stories chapter by chapter, add covers and genres, and share them
              with a growing community of readers who love discovering new
              voices.
            </p>
          </article>
          <article className="rounded-xl shadow-xl w-full h-full p-8 bg-transparent">
            <h1 className="block text-xl font-serif font-bold">Stay Updated</h1>
            <p className="mt-2 text-lg font-serif font-thin">
              Bring your imagination to life with an intuitive writing interface
              built for both first-time writers and seasoned authors. Publish
              stories chapter by chapter, add covers and genres, and share them
              with a growing community of readers who love discovering new
              voices.
            </p>
          </article>
        </div>
      </section>
      <Footer />
    </>
  );
}
