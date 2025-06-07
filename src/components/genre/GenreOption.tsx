import Banner, { BannerProps } from "@/components/Banner.tsx";
import { Genre } from "@/types/Book.ts";
import { cn } from "@/utils/ClassNames.ts";
import { memo } from "react";

interface GenreOptionProps extends BannerProps {
  genreIds: number[] | undefined;
  genre: Genre;
}

function GenreOption({
  genre,
  genreIds,
  className,
  ...props
}: GenreOptionProps) {
  const { id, name } = genre;

  const isActive = genreIds?.includes(id);

  return (
    <Banner
      variant={"custom"}
      className={cn(
        className,
        `${
          isActive
            ? "text-white bg-primary border-primary hover:bg-primary/90 hover:border-primary border border-solid"
            : "text-primary border-primary border border-solid bg-transparent hover:text-white hover:bg-primary"
        }    duration-200 ease-in-out transition-all hover:cursor-pointer hover:shadow-md`
      )}
      {...props}
    >
      {name}
    </Banner>
  );
}

export default memo(GenreOption);
