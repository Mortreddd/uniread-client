import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/ClassNames";
import { FC, forwardRef, ImgHTMLAttributes } from "react";
import defaultCover from "@/assets/cover6.jpg";
interface BookCoverProps
  extends ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof bookCoverVariants> {}

const bookCoverVariants = cva("rounded object-cover object-center shadow-md", {
  variants: {
    size: {
      default: "h-56 w-40",
      sm: "h-36 w-24",
      md: "h-44 w-32",
      jumbotron: "h-96 w-64",
      custom: "",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const BookCover: FC<BookCoverProps> = forwardRef<
  HTMLImageElement,
  BookCoverProps
>(({ src = defaultCover, className, size, ...props }, ref) => {
  return (
    <>
      <img
        ref={ref}
        src={src}
        className={cn(bookCoverVariants({ size, className }))}
        {...props}
      />
    </>
  );
});

export { bookCoverVariants, BookCover };
