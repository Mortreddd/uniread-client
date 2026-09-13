import Label from "@/shared/components/form/Label";
import { Step1Data } from "./Step1Form";
import { Step2Data } from "./Step2Form";
import { Step3Data } from "./Step3Form";
import { useFormContext } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useMemo, useState } from "react";
import StepCard from "./StepCard";

interface Step4Data extends Step1Data, Step2Data, Step3Data {}

export default function Step4Form() {
  const { watch } = useFormContext<Step4Data>();
  const { user } = useAuth();

  const values = watch();
  const {
    cover,
    title,
    description,
    matured,
    genres = [],
    collaborators = [],
  } = values;

  const [coverUrl, setCoverUrl] = useState<string | undefined>();
  useEffect(() => {
    if (cover instanceof File) {
      const url = URL.createObjectURL(cover);
      setCoverUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setCoverUrl(undefined);
  }, [cover]);

  const genreNames = useMemo(() => {
    if (!genres) return [];
    const map = new Map(genres.map((g) => [g.id, g.name]));
    return genres.map((genre) => map.get(genre.id) ?? genre.id);
  }, [genres]);

  return (
    <div className="space-y-3 lg:space-y-4">
      <StepCard>
        <h5 className="text-sm md:text-base lg:text-lg font-newsreader text-gray-800 dark:text-gray-200 font-semibold tracking-wide mb-2">
          1. Book Cover
        </h5>
        <div className="w-36 h-52 md:w-40 md:h-56 border border-solid border-primary dark:border-primary-dark rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-900 mx-auto">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt="Cover"
              className="size-full object-cover object-center"
            />
          ) : (
            <div className="size-full flex items-center justify-center text-xs text-gray-500">
              No cover uploaded
            </div>
          )}
        </div>
      </StepCard>

      <StepCard>
        <h5 className="text-sm md:text-base lg:text-lg font-newsreader text-gray-800 dark:text-gray-200 font-semibold tracking-wide">
          1. Story Overview & Synopsis
        </h5>
        <div className="mb-4 lg:mb-6">
          <Label className="font-thin">Story Title</Label>
          <p className="font-semibold text-sm md:text-lg lg:text-xl font-newsreader text-gray-800 dark:text-gray-200">
            {title || <span className="italic text-gray-400">Untitled</span>}
          </p>
        </div>
        <div className="relative space-y-1 lg:space-y-1.5 mb-4 lg:mb-6">
          <Label className="font-thin">Synopsis / Blurb</Label>
          <p className="text-xs md:text-sm font-sans text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {description || (
              <span className="italic text-gray-400">No synopsis</span>
            )}
          </p>
        </div>

        <h5 className="text-sm md:text-base lg:text-lg font-newsreader text-gray-800 dark:text-gray-200 font-semibold tracking-wide">
          2. Categorization & Discoverability
        </h5>
        <div className="relative space-y-1 lg:space-y-1.5 mb-2">
          <Label className="font-thin block">Mature Content</Label>
          <p className="text-xs md:text-sm font-sans text-gray-800 dark:text-gray-200">
            {matured ? "Yes" : "No"}
          </p>
        </div>
        <div className="relative space-y-1 lg:space-y-1.5">
          <Label className="font-thin">Genres Applied</Label>
          <div className="flex flex-wrap gap-1 lg:gap-2">
            {genreNames.length > 0 ? (
              genreNames.map((name) => (
                <span
                  key={name}
                  className="shrink-0 px-1 py-0.5 md:px-1.5 md:py-1 lg:px-2.5 lg:py-2 text-[10px] md:text-xs lg:text-sm font-sans text-gray-900 dark:text-gray-100 rounded bg-primary dark:bg-primary-dark"
                >
                  {name}
                </span>
              ))
            ) : (
              <p className="text-[8px] md:text-[10px] lg:text-xs font-sans text-gray-800 dark:text-gray-200 italic">
                No genres selected
              </p>
            )}
          </div>
        </div>
      </StepCard>

      {/* ──────── Step 3: Collaborators ──────── */}
      <StepCard>
        <h5 className="text-sm md:text-base lg:text-lg font-newsreader text-gray-800 dark:text-gray-200 font-semibold tracking-wide">
          3. Collaborators & Rights Management
        </h5>
        <div className="relative space-y-1 lg:space-y-1.5 mt-2">
          <Label className="font-thin">Author Team & Access Controls</Label>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-1 md:gap-2 lg:gap-5">
            {user && (
              <figure className="col-span-1 flex items-center flex-1 bg-gray-100 dark:bg-slate-900 rounded p-1 md:p-2 shadow">
                <img
                  src={user.profile.avatarUrl}
                  alt={user.username}
                  className="size-8 lg:size-10 rounded-full mx-1.5 lg:mx-2 min-w-0 shrink-0"
                />
                <div className="text-left space-y-0.5 md:space-y-1 flex-1">
                  <p className="text-xs md:text-sm font-sans font-semibold text-gray-800 dark:text-gray-200">
                    {user.profile.displayName} (You)
                  </p>
                  <p className="text-tiny md:text-xs font-sans font-thin text-gray-600 dark:text-gray-400">
                    {user.username}
                  </p>
                </div>
                <p className="font-newsreader font-medium text-extratiny md:text-tiny rounded-full py-0.5 px-1 md:px-1.5 md:py-0.5 text-orange-800 border border-orange-800 shadow bg-orange-200">
                  Primary Creator
                </p>
              </figure>
            )}

            {collaborators.map((c) => (
              <figure
                key={c}
                className="col-span-1 flex items-center flex-1 bg-gray-100 dark:bg-slate-900 rounded p-1 md:p-2 shadow"
              >
                <div className="text-left space-y-0.5 md:space-y-1 flex-1 px-2">
                  <p className="text-xs md:text-sm font-sans font-semibold text-gray-800 dark:text-gray-200">
                    {c}
                  </p>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </StepCard>
    </div>
  );
}
