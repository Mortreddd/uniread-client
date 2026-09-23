import Label from "@/shared/components/form/Label";
import TextArea from "@/shared/components/form/TextArea";
import { GenreDetail } from "@/shared/types/Genre";
import { useGetGenreDetails } from "@/shared/hooks/useGenre";
import { Controller, useFormContext } from "react-hook-form";
import { useMemo } from "react";
import { cn } from "@/utils/ClassNames";
import { motion } from "motion/react";
import Toggle from "@/shared/components/form/Toggle";

export interface Step2Data {
  title: string;
  description: string;
  matured: boolean;
  genres: GenreDetail[];
  tags: string[];
}

export default function Step2Form() {
  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useFormContext<Step2Data>();

  const { data: genres } = useGetGenreDetails({});

  const selectedGenres = watch("genres") ?? [];

  const genreOptions = useMemo(() => {
    if (!genres || genres.empty) return [];
    return genres.content;
  }, [genres]);

  function handleSelectGenre(genre: GenreDetail) {
    const next = selectedGenres.some((g) => g.id === genre.id)
      ? selectedGenres.filter((g) => g.id !== genre.id)
      : [...selectedGenres, genre];

    setValue("genres", next, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }

  return (
    <div className="relative p-2 md:p-3 rounded-lg bg-gray-200 dark:bg-slate-800 shadow">
      <h5 className="text-sm md:text-base lg:text-lg font-newsreader text-gray-800 dark:text-gray-200 font-semibold tracking-wide">
        1. Story Overview & Synopsis
      </h5>

      <div className="mb-4 lg:mb-6">
        <Label className="font-thin">Story Title</Label>
        <TextArea
          rows={1}
          {...register("title", { required: "Book title is required" })}
          className="w-full"
          error={errors.title?.message}
        />
      </div>

      <div className="relative space-y-1 lg:space-y-1.5 mb-4 lg:mb-6">
        <Label className="font-thin">Synopsis / Blurb</Label>
        <TextArea
          className="font-newsreader text-xs md:text-sm lg:text-base"
          {...register("description", {
            required: "Synopsis is required",
            maxLength: {
              value: 2000,
              message: "Synopsis must not exceed 2000 characters",
            },
          })}
          limit={2000}
          error={errors.description?.message}
          showLimitIndicator={true}
        />
      </div>

      <h5 className="text-sm md:text-base lg:text-lg font-newsreader text-gray-800 dark:text-gray-200 font-semibold tracking-wide">
        2. Categorization & Discoverability
      </h5>

      <div className="relative space-y-1 lg:space-y-1.5 inline-flex justify-between gap-4 lg:gap-6">
        <Label className="font-thin block">Mature Content</Label>
        <Controller
          name="matured"
          control={control}
          render={({ field }) => (
            <Toggle
              checked={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              toggleSize="md"
            />
          )}
        />
      </div>

      <div className="relative space-y-1 lg:space-y-1.5 mb-4 lg:mb-6">
        {/* Register the field once so RHF tracks errors for genres */}
        <input
          type="hidden"
          {...register("genres", {
            validate: (v) =>
              (Array.isArray(v) && v.length > 0) || "Select at least one genre",
          })}
        />

        <Label className="font-thin">Choose Genre</Label>
        <div className="flex flex-wrap gap-1 lg:gap-2">
          {genreOptions.length > 0 ? (
            genreOptions.map((genre) => (
              <GenreCard
                key={genre.id}
                genre={genre}
                isPresent={selectedGenres.some((g) => g.id === genre.id)}
                onToggle={handleSelectGenre}
              />
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0, translateY: -0.4 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              className="text-[8px] md:text-[10px] lg:text-xs font-sans text-gray-800 dark:text-gray-200"
            >
              No genres available
            </motion.p>
          )}
        </div>

        <Label className="font-thin">Genres Applied</Label>
        <div className="flex flex-wrap gap-1 lg:gap-2">
          {selectedGenres.length > 0 ? (
            selectedGenres.map((genre) => (
              <GenreCard
                key={genre.id}
                genre={genre}
                isPresent={true}
                onToggle={handleSelectGenre}
              />
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0, translateY: -0.4 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              className={cn(
                "text-[8px] md:text-[10px] lg:text-xs font-sans",
                errors.genres
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-800 dark:text-gray-200",
              )}
            >
              No genres selected
            </motion.p>
          )}
        </div>

        {/* Genre error message */}
        {errors.genres && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="text-tiny md:text-xs font-sans text-red-600 dark:text-red-400"
          >
            {errors.genres.message}
          </motion.p>
        )}
      </div>
    </div>
  );
}

interface GenreCardProps {
  genre: GenreDetail;
  isPresent: boolean;
  onToggle: (genre: GenreDetail) => void;
}

function GenreCard({ genre, isPresent, onToggle }: GenreCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: -0.7 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -0.7 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      onClick={() => onToggle(genre)}
      className={cn(
        "shrink-0 px-1 py-0.5 md:px-1.5 md:py-1 lg:px-2.5 lg:py-2 text-[10px] md:text-xs lg:text-sm font-sans text-gray-900 dark:text-gray-100 rounded hover:cursor-pointer duration-200 ease-in-out",
        isPresent
          ? "bg-primary dark:bg-primary-dark hover:bg-primary/80 dark:hover:bg-primary-dark/20"
          : "bg-gray-50 dark:bg-slate-900 hover:bg-gray-200 dark:hover:bg-slate-800",
      )}
    >
      {genre.name}
    </motion.div>
  );
}
