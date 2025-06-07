import { Genre as GenreType } from "@/types/Book";
import { cn } from "@/utils/ClassNames";
import { HTMLAttributes } from "react";

interface GenreProps extends HTMLAttributes<HTMLDivElement> {
  genre: GenreType;
}

export default function Genre({ genre, className, ...rest }: GenreProps) {
  const { backgroundImage, name } = genre;
  return (
    <div
      className={cn("w-full h-full rounded-lg overflow-hidden", className)}
      {...rest}
    >
      <div
        style={{
          background: `url(${backgroundImage})`,
        }}
        className="bg-cover bg- bg-no-repeat aspect-video w-full backdrop-blur-xs h-full rounded-lg"
      >
        <div className="flex justify-center items-center cursor-pointer bg-[rgba(0,0,0,0.4)] w-full h-full">
          <h1 className="text-2xl text-white font-serif font-bold">{name}</h1>
        </div>
      </div>
    </div>
  );
}
