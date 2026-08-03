import { Link } from "react-router-dom";
import { Button } from "./form/Button";
import SystemStatusBadge from "./SystemStatusBadge";
import { motion } from "motion/react";

export default function NotFoundSection() {
  return (
    <motion.div
      initial={{
        translateY: -10,
        opacity: 0,
      }}
      animate={{
        translateY: 0,
        opacity: 1,
        transition: {
          ease: "backInOut",
          duration: 0.4,
        },
      }}
      className={"h-full relative"}
    >
      <div className="flex items-center justify-center z-10 h-full backdrop-blur-xs">
        <div className="max-w-7xl min-w-60 md:min-w-80 lg:min-w-96 space-y-2 md:space-y-4 lg:space-y-6">
          <div className="mx-auto w-fit">
            <SystemStatusBadge>System Status: Operational</SystemStatusBadge>
          </div>
          <h1 className="text-lg md:text-xl lg:text-2xl font-newsreader leading-tight italic font-medium text-black dark:text-white text-center">
            A Momentary Lapse in the Narrative
          </h1>
          <p className="text-center text-xs md:text-sm:lg:text-base font-serif text-gray-800 dark:text-gray-300 leading-relaxed">
            Our digital archives are currently reorganizing. The page you seek
            might have been archived, moved, or is undergoing a technical
            revision.
          </p>
          <Button className="mx-auto rounded">
            <Link to={"/"} className={"text-tiny md:text-xs lg:text-sm"}>
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
