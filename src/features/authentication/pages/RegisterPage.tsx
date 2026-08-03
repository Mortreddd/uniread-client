import AppLayout from "@/layouts/AppLayout";
import teamMeeting from "@/assets/backgrounds/team-meeting.png";
import { Input } from "@/shared/components/form/Input";
import CustomSelect from "@/shared/components/form/CustomSelect";
import { Gender } from "@/features/users/types/User";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Footer from "@/shared/components/Footer";
import { Button } from "@/shared/components/form/Button";
import Label from "@/shared/components/form/Label";
import { AxiosError } from "axios";
import { useAlert } from "@/contexts/AlertContext";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { RegisterFormProps } from "../types/Auth";

export default function RegisterPage() {
  return (
    <AppLayout>
      <section className="flex flex-1 min-h-0 relative dark:bg-slate-800 bg-slate-100">
        {/* Automatic expandable sidebar and responsive */}
        <div className="hidden lg:flex flex-1 relative">
          <img
            src={teamMeeting}
            alt="Team Meeting"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center"></div>
        </div>
        <div className="flex-1 relative p-5 md:p-10">
          <h6 className="font-sans font-semibold text-primary dark:text-primary-dark text-tiny md:text-xs lg:text-sm tracking-wide">
            NEW ACCOUNT
          </h6>
          <h1 className="font-newsreader text-gray-900 dark:text-gray-100 text-xl md:text-2xl lg:text-3xl tracking-wide mb-1 md:mb-2">
            Join the Collective
          </h1>
          <p
            className={
              "text-gray-700 dark:text-gray-300 font-sans text-tiny md:text-xs lg:text-sm mb-3 md:mb-4"
            }
          >
            Create your editorial identity and start shaping the narrative
            today.
          </p>
          <RegisterForm />
        </div>
      </section>
      <Footer />
    </AppLayout>
  );
}

function RegisterForm() {
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const registerMutation = useRegister();
  const {
    register,
    handleSubmit,
    control,
    setError,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<RegisterFormProps>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      gender: Gender.OTHER,
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit: SubmitHandler<RegisterFormProps> = async (data) => {
    try {
      await registerMutation.mutateAsync(data);

      showAlert(
        "Successfully registered, please check your email for confirmation",
        "success",
      );
      navigate("/");
    } catch (error) {
      const axiosError = error as AxiosError<Record<string, string>>;

      if (axiosError.response?.data) {
        const backendErrors = axiosError.response.data;

        Object.entries(backendErrors).forEach(([field, message]) => {
          setError(field as keyof RegisterFormProps, {
            type: "server",
            message,
          });
        });
      } else {
        showAlert("Something went wrong. Please try again.", "error");
      }
    }
  };
  const genders = [
    { value: Gender.MALE, label: "Male" },
    { value: Gender.FEMALE, label: "Female" },
    { value: Gender.OTHER, label: "Other" },
  ];
  return (
    <div className="space-y-1 md:space-y-2 relative">
      <div className="flex items-end gap-3 md:gap-5">
        <div className="space-y-0.5 grow">
          <Label>First Name</Label>
          <Input
            className="w-full"
            placeholder={"e.g., John"}
            {...register("firstName")}
            error={errors?.firstName?.message}
          />
        </div>
        <div className="space-y-0.5 grow">
          <Label>Last Name</Label>
          <Input
            className="w-full"
            placeholder={"e.g., Doe"}
            {...register("lastName")}
            error={errors?.lastName?.message}
          />
        </div>
      </div>
      <div className="space-y-0.5 w-60 md:w-80">
        <Label>Gender</Label>
        <Controller
          name="gender"
          control={control}
          rules={{ required: "Gender is required" }}
          render={({ field }) => (
            <CustomSelect
              value={field.value}
              onChange={field.onChange}
              options={genders}
              variant="primary"
              size="md"
              error={errors.gender?.message}
            />
          )}
        />
      </div>
      <div className="space-y-0.5">
        <Label>Username</Label>
        <Input
          className="w-full"
          placeholder={"e.g., john_doe"}
          withUsername={true}
          {...register("username")}
          error={errors?.username?.message}
        />
      </div>
      <div className="space-y-0.5">
        <Label>Email Address</Label>
        <Input
          className="w-full"
          placeholder={"e.g., john.doe@example.com"}
          {...register("email", {
            onChange: () => clearErrors("email"),
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          error={errors?.email?.message}
        />
      </div>

      <div className="flex items-end gap-3 md:gap-5">
        <div className="space-y-0.5 grow">
          <Label>Password</Label>
          <Input
            className={"w-full"}
            type="password"
            {...register("password", {
              onChange: () => clearErrors("password"),
              validate: (value) =>
                value === confirmPassword || "Password do not match",
            })}
            error={errors.password?.message}
          />
        </div>

        <div className="space-y-0.5 grow">
          <Label>Confirm Password</Label>
          <Input
            className={"w-full"}
            type="password"
            {...register("confirmPassword", {
              onChange: () => clearErrors("confirmPassword"),
              validate: (value) =>
                value === password || "Confirm Password do not match",
            })}
            error={errors.confirmPassword?.message}
          />
        </div>
      </div>
      <Button
        className={"rounded w-full mt-4 md:mt-5"}
        onClick={handleSubmit(onSubmit)}
        loading={registerMutation.isPending}
        disabled={registerMutation.isPending}
      >
        <span className="text-xs md:text-sm lg:text-base font-sans tracking-wide">
          Register
        </span>
      </Button>
    </div>
  );
}
