import gojoProfile from "@/assets/profiles/gojo.jpg";

interface UserAvatarProps {
  img?: string;
}

export default function UserAvatar({ img = gojoProfile }: UserAvatarProps) {
  return (
    <img
      src={img}
      className={
        "size-6 md:size-9 object-contain rounded-full border border-primary dark:border-primary-dark"
      }
    />
  );
}
