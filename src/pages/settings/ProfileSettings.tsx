import { Input } from "@/shared/components/form/Input";
import { useAuth } from "@/contexts/AuthContext";
import backgroundImage from "@/assets/backgrounds/Profile.webp";
import defaultProfle from "@/assets/profiles/gojo.jpg";
import { CameraIcon } from "@heroicons/react/24/outline";
import { Button } from "@/shared/components/form/Button";
import { useForm } from "react-hook-form";
import { User } from "@/types/User";
import TextArea from "@/shared/components/form/TextArea";

export default function ProfileSettings() {
  const { user } = useAuth();
  const {
    register,
    formState: { isDirty },
    setValue,
  } = useForm<User>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      fullName: user?.fullName,
      username: user?.username,
    },
  });

  return (
    <section className="flex-1 min-h-0 relative p-8 overflow-y-auto">
      <h1 className="text-2xl font-bold font-serif text-gray-800">
        Public Profile
      </h1>
      <p className="mt-2 text-gray-700">
        Update your public presence to other writers and readers.
      </p>
      <div className="mt-10 bg-white rounded-xl shadow-md overflow-hidden relative">
        <div className="w-full h-96 relative">
          <img
            src={backgroundImage}
            className="w-full h-full object-cover object-center"
          />

          <div className="absolute bottom-6 right-6 bg-black/40 text-white rounded-md px-3 py-2 inline-flex gap-2 items-center backdrop-blur-sm cursor-pointer hover:bg-black/60 transition">
            <CameraIcon className="size-4" />
            <p className="font-sans text-sm">Change Banner</p>
          </div>
        </div>

        <div className="h-fit w-full px-10 -translate-y-14 relative">
          <div className="w-full h-fit items-end justify-between flex">
            <img
              src={defaultProfle}
              className={
                "size-32 rounded-lg border-2 border-primary object-contain"
              }
            />
            <Button className="rounded" variant={"inactivePrimary"}>
              View Profile
            </Button>
          </div>

          <div className="mt-3 flex justify-between items-center gap-10 font-sans text-gray-700">
            <div className="space-y-2 flex-1">
              <label htmlFor="displayName" className={"text-semibold"}>
                Display Name
              </label>
              <Input
                variant={"primary"}
                {...register("fullName")}
                inputSize={"md"}
                name={"displayName"}
                className={"w-full"}
              />
            </div>
            <div className="space-y-2 flex-1">
              <label htmlFor="username" className={"text-semibold"}>
                Username
              </label>
              <Input
                withUsername={true}
                {...register("username")}
                variant={"primary"}
                inputSize={"md"}
                name={"username"}
                className={"w-full"}
              />
            </div>
          </div>
          <div className="mt-3 font-sans text-gray-700 space-y-2 flex-1">
            <label htmlFor="bio" className={"text-semibold"}>
              Bio
            </label>
            <TextArea variant={"primary"} name={"bio"} className={"w-full"} />
          </div>
        </div>
      </div>
    </section>
  );
}
