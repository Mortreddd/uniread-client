import { CheckIcon } from "@heroicons/react/24/outline";
import { ImgHTMLAttributes } from "react";

interface UserAvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  withBadge?: boolean;
  withVerified?: boolean;
}

export default function UserAvatar({
  withBadge = false,
  withVerified = false,
  className,
  ...props
}: UserAvatarProps) {
  return (
    <div className={`relative ${className}`}>
      <img
        {...props}
        className={`size-full rounded-full object-center object-cover border border-primary dark:border-primary-dark`}
      />
      {withVerified && (
        <span className="absolute right-0 bottom-0 rounded-full bg-blue-700">
          <CheckIcon className={"text-white size-3 bg-transparent"} />
        </span>
      )}
    </div>
  );
}
