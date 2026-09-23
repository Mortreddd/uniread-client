import { useAuth } from "@/contexts/AuthContext";
import Label from "@/shared/components/form/Label";
import UserAvatar from "@/shared/components/UserAvatar";
import { AuthUser } from "@/types/Auth";
import { PhotoIcon, PlusIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "motion/react";
import { useFormContext } from "react-hook-form";

export interface Step3Data {
  collaborators: string[];
}

export default function Step3Form() {
  const { user } = useAuth();

  // const { register, setValue } = useFormContext<Step3Data>();

  return (
    <div className="relative p-2 md:p-3 rounded-lg bg-gray-200 dark:bg-slate-800 shadow">
      <h5 className="text-sm md:text-base lg:text-lg font-newsreader text-gray-800 dark:text-gray-200 font-semibold tracking-wide">
        3. Collaborators & Rights Management
      </h5>
      <div className="relative space-y-1 lg:space-y-1.5 mb-4 lg:mb-6">
        <Label className={"font-thin"}>Author Team & Access Controls</Label>
        <AnimatePresence mode="wait">
          {user && <CollaboratorsSection author={user} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface CollaboratorsSectionProps {
  author: AuthUser;
}
function CollaboratorsSection({ author }: CollaboratorsSectionProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        translateY: -0.6,
      }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        ease: "easeInOut",
        duration: 0.5,
      }}
      className="relative w-full"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-1 md:gap-2 lg:gap-5">
        <figure className="col-span-1 flex items-center flex-1 bg-gray-100 dark:bg-slate-900 rounded p-1 md:p-2 shadow">
          <img
            src={author.profile.avatarUrl}
            alt={author.username}
            className={
              "size-8 lg:size-10 rounded-full mx-1.5 lg:mx-2 min-w-0 shrink-0"
            }
          />
          <div className="text-left space-y-0.5 md:space-y-1 flex-1">
            <p className="text-xs md:text-sm font-sans font-semibold text-gray-800 dark:text-gray-200">
              {author.profile.displayName} (You)
            </p>
            <p
              className={
                "text-tiny md:text-xs font-sans font-thin text-gray-600 dark:text-gray-400"
              }
            >
              {author.username}
            </p>
          </div>
          <p className="font-newsreader font-medium text-extratiny md:text-tiny rounded-full py-0.5 px-1 md:px-1.5 md:py-0.5 text-orange-800 border border-orange-800 shadow bg-orange-200">
            Primary Creator
          </p>
        </figure>
        <motion.figure
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2, ease: "easeIn" }}
          className="col-span-1 flex items-center flex-1 bg-gray-100 dark:bg-slate-900 rounded p-1 md:p-2 shadow hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-slate-700 transition-all duration-200 ease-in-out"
        >
          <PlusIcon className="text-gray-600 dark:text-gray-400 size-6 lg:size-8 rounded-full mx-1.5 lg:mx-2 min-w-0 shrink-0" />
          <div className="text-left space-y-0.5 md:space-y-1 flex-1">
            <p className="text-tiny md:text-xs lg:text-sm font-sans font-semibold text-gray-800 dark:text-gray-200">
              Add Collaborator
            </p>
          </div>
        </motion.figure>
      </div>
    </motion.div>
  );
}
