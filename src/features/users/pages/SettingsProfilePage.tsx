import background from "@/assets/many-books.jpg";
import { Button } from "@/shared/components/form/Button";
import {
  CameraIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import gojoProfile from "@/assets/profiles/gojo.jpg";
import { Input } from "@/shared/components/form/Input";
import TextArea from "@/shared/components/form/TextArea";
import CustomSelect from "@/shared/components/form/CustomSelect";
import { Gender } from "../types/User";
import { useMyProfile } from "../hooks/useMyProfile";
import UserProfileSkeleton from "../components/UserProfileSkeleton";
import { UserProfileDetails } from "../types/UserProfile";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { ModalRef } from "@/shared/components/Modal";
import AvatarPhotoModal from "../components/modals/AvatarPhotoModal";
import { useAuth } from "@/contexts/AuthContext";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { useAlert } from "@/contexts/AlertContext";

export default function SettingsProfilePage() {
  const { data, isLoading, isError, refetch } = useMyProfile();

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

  return (
    <motion.section
      initial={{
        opacity: 0,
        translateY: -10,
        transition: {
          ease: "easeOut",
          duration: 0.3,
        },
      }}
      animate={{ opacity: 1, translateY: 0 }}
      className="size-full relative p-2 md:p-3"
    >
      <h3 className="font-semibold tracking-wide text-xs md:text-sm lg:text-base font-sans text-gray-900 dark:text-gray-100">
        Public Profile
      </h3>
      <p className="font-sans text-gray-600 dark:text-gray-300 text-tiny md:text-xs lg:text-sm mb-3 md:mb-4">
        Update your public presence to other writers and readers.
      </p>

      <section className="rounded-lg w-full bg-gray-200 dark:bg-slate-800 pb-4 md:pb-5 mb-5 md:mb-7">
        {data && <PrimaryProfileCard />}
        {data && <ProfileDetails profile={data} />}
      </section>

      <div className="rounded-lg w-full bg-red-200 p-4 md:p-5 dark:bg-red-200/10 mb-5 md:mb-7">
        <DangerZoneSection />
      </div>
    </motion.section>
  );
}

function PrimaryProfileCard() {
  const { user, handleProfileUpdate } = useAuth();
  const avatarModalRef = useRef<ModalRef>(null);
  const [currentAvatar, setCurrentAvatar] = useState<string | undefined>(
    user?.profile?.avatarUrl ?? gojoProfile,
  );

  function onUpdateAvatarPhoto(newAvatarUrl: string) {
    setCurrentAvatar(newAvatarUrl);
    handleProfileUpdate();
  }
  return (
    <>
      <div className="w-full relative">
        <img
          src={background}
          className={
            "h-36 md:h-44 lg:h-52 w-full object-cover object-center rounded"
          }
        />
        <AvatarPhotoModal
          avatarPhoto={currentAvatar}
          ref={avatarModalRef}
          onUpdate={onUpdateAvatarPhoto}
        />
        <div className="size-20 md:size-24 translate-y-10 left-5 bottom-0 z-10 absolute border border-solid border-primary dark:border-primary-dark rounded-lg overflow-hidden">
          <div
            className="relative size-full group"
            onClick={() => avatarModalRef.current?.open()}
          >
            <img
              src={currentAvatar}
              className="size-full object-cover object-center"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute hidden md:flex inset-0 items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 group-hover:cursor-pointer transition"
            >
              <CameraIcon className="size-5 md:size-6 text-gray-100" />
            </motion.div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/60"></div>
        <Button
          type={"button"}
          className={
            "inline-flex items-center absolute right-3 bottom-3 rounded"
          }
        >
          <CameraIcon className="size-3 md:size-4 lg:size-5 mr-2" />
          <span className={"text-gray-200 text-tiny md:text-xs lg:text-sm"}>
            Change Banner
          </span>
        </Button>
      </div>
      <div className="mt-2 px-3 md:px-5 relative w-full">
        <div className="flex w-full justify-end items-center">
          <Button variant={"secondary"} className={"rounded"}>
            <span className={"text-gray-200 text-tiny md:text-xs lg:text-sm"}>
              View Profile
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}
``;
type UpdateProfileRequest = Omit<
  UserProfileDetails,
  "coverPhoto" | "avatarPhoto"
>;
function ProfileDetails({ profile }: { profile: UserProfileDetails }) {
  const updateProfileMutation = useUpdateProfile();
  const { showAlert } = useAlert();
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { isDirty, errors },
  } = useForm<UpdateProfileRequest>({
    defaultValues: {
      ...profile,
    },
  });

  const genders = [
    { value: Gender.FEMALE, label: "Female" },
    { value: Gender.MALE, label: "Male" },
    { value: Gender.OTHER, label: "Other" },
  ];

  function resetFields() {
    reset({
      displayName: profile.displayName,
      firstName: profile.firstName,
      lastName: profile.lastName,
      gender: profile.gender,
      bio: profile.bio,
    });
  }

  const onSubmit: SubmitHandler<UpdateProfileRequest> = async (data) => {
    try {
      await updateProfileMutation.mutateAsync(data);

      showAlert("Profile updated successfully", "success");
    } catch (error: any) {
      const response = error?.response?.data;

      if (response?.fieldErrors) {
        Object.entries(response.fieldErrors).forEach(([field, message]) => {
          setError(field as keyof UpdateProfileRequest, {
            type: "server",
            message: message as string,
          });
        });
      }

      if (response?.message) {
        showAlert(response.message, "error");
      }
    }
  };
  return (
    <form
      className="px-3 md:px-5 relative w-full space-y-2 md:space-y-3 mt-4 md:mt-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-0.5 w-60 md:w-96">
        <h3 className="font-semibold text-tiny md:text-xs lg:text-sm text-gray-900 dark:text-gray-100">
          Display Name
        </h3>
        <Input
          className="w-full"
          {...register("displayName")}
          error={errors?.displayName?.message}
        />
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <div className="space-y-0.5 grow">
          <h3 className="font-semibold text-tiny md:text-xs lg:text-sm text-gray-900 dark:text-gray-100">
            First Name
          </h3>
          <Input
            inputSize="sm"
            className="w-full"
            {...register("firstName")}
            error={errors?.firstName?.message}
          />
        </div>

        <div className="space-y-0.5 grow">
          <h3 className="font-semibold text-tiny md:text-xs lg:text-sm text-gray-900 dark:text-gray-100">
            Last Name
          </h3>
          <Input
            inputSize="sm"
            className="w-full"
            {...register("lastName")}
            error={errors?.lastName?.message}
          />
        </div>
      </div>

      <div className="space-y-0.5 w-60 md:w-80">
        <h3 className="font-semibold text-tiny md:text-xs lg:text-sm text-gray-900 dark:text-gray-100">
          Gender
        </h3>
        <Controller
          name="gender"
          control={control}
          defaultValue={profile.gender}
          render={({ field, fieldState }) => (
            <CustomSelect
              {...field}
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
              options={genders}
              variant="primary"
              size="md"
            />
          )}
        />
      </div>

      <div className="space-y-0.5">
        <h3 className="font-semibold text-tiny md:text-xs lg:text-sm text-gray-900 dark:text-gray-100">
          Bio
        </h3>
        <TextArea
          className="w-full text-tiny md:text-xs lg:text-sm"
          rows={1}
          {...register("bio")}
          error={errors?.bio?.message}
        />
        <p className="text-gray-700 dark:text-gray-300 font-semibold text-extratiny md:text-tiny lg:text-xs">
          Maximum 250 characters. You can use Markdown to format your bio.
        </p>
      </div>

      {isDirty && (
        <div className="w-full flex justify-end gap-3 md:gap-4 items-center">
          <Button
            variant={"dark"}
            className={"rounded"}
            disabled={updateProfileMutation.isPending}
            onClick={() => resetFields()}
          >
            <span className="text-xs md:text-sm lg:text-base font-sans text-white">
              Cancel
            </span>
          </Button>
          <Button
            className="rounded"
            type={"submit"}
            disabled={!isDirty || updateProfileMutation.isPending}
            loading={updateProfileMutation.isPending}
          >
            <span className="text-xs md:text-sm lg:text-base font-sans text-white">
              Update Profile
            </span>
          </Button>
        </div>
      )}
    </form>
  );
}

function DangerZoneSection() {
  return (
    <>
      <div className="flex gap-2 md:gap-3 items-center mb-3 md:mb-4">
        <ExclamationTriangleIcon className="size-4 md:size-5 lg:size-6 text-red-600 block" />
        <h6 className="font-semibold tracking-wide text-xs md:text-sm lg:text-base font-sans text-red-600 leading-none">
          Danger Zone
        </h6>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0 space-y-0.5">
          <p className="text-tiny md:text-xs lg:text-sm font-sans text-gray-900 font-semibold dark:text-gray-100">
            Delete Account
          </p>
          <p className="text-extratiny md:text-tiny lg:text-xs font-sans text-gray-700 dark:text-gray-300">
            Once deleted, your books and profile cannot be recovered after 30
            days.
          </p>
        </div>
        <Button variant={"danger"} className={"rounded"}>
          <span className={"text-tiny md:text-xs lg:text-sm"}>
            Delete Account
          </span>
        </Button>
      </div>
    </>
  );
}

function ErrorState({ onRetry }: { onRetry: VoidFunction }) {
  return (
    <div className="w-full h-40 md:h-60 flex items-center justify-center">
      <div className="relative text-center space-y-2">
        <h6 className="text-base md:text-lg lg:text-sm text-gray-800 dark:text-gray-200">
          Unable to load profile, please try again.
        </h6>
        <Button
          variant="primary"
          onClick={onRetry}
          className={"mx-auto rounded"}
        >
          <span className="text-xs md:text-sm lg:text-base text-white">
            Reload Profile
          </span>
        </Button>
      </div>
    </div>
  );
}
