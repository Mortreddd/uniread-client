import AppLayout from "@/layouts/AppLayout";
import teamMeeting from "@/assets/backgrounds/team-meeting.png";
import { Input } from "@/shared/components/form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import Footer from "@/shared/components/Footer";
import { Button } from "@/shared/components/form/Button";
import Label from "@/shared/components/form/Label";
import { AxiosError } from "axios";
import { useAlert } from "@/contexts/AlertContext";
import { useLocation, useNavigate } from "react-router-dom";
import { VerifyEmailForm } from "../types/Auth";
import { AnimatePresence, motion } from "motion/react";
import { useVerify } from "../hooks/useVerify";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default function VerifyAccountPage() {
  return (
    <AppLayout>
      <AnimatePresence>
        <section className="flex flex-1 min-h-0 relative dark:bg-slate-800 bg-slate-100">
          {/* Automatic expandable sidebar and responsive */}
          <motion.div className="hidden lg:flex flex-1 relative">
            <motion.img
              initial={{
                opacity: 0,
                translateX: -0.3,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeIn",
              }}
              src={teamMeeting}
              alt="Team Meeting"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center"></div>
          </motion.div>
          <div className="flex-1 relative p-5 md:p-10">
            <motion.h6
              initial={{
                opacity: 0,
                translateX: 0.3,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
              transition={{
                duration: 0.4,
                ease: "easeIn",
              }}
              className="font-newsreader font-semibold tracking-tight text-primary dark:text-primary-dark text-xl md:text-2xl lg:text-3xl"
            >
              VERIFY EMAIL
            </motion.h6>
            <motion.p
              initial={{
                opacity: 0,
                translateX: 0.1,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeIn",
              }}
              className={
                "text-gray-700 font-thin dark:text-gray-300 font-sans text-tiny md:text-xs lg:text-sm mb-3 md:mb-4"
              }
            >
              Your account is temporarily locked due to unverified email
              address. Complete verification to activate your editorial profile,
              peer review queue, and published manuscripts.
            </motion.p>
            <VerifyAccountForm />
          </div>
        </section>
        <Footer />
      </AnimatePresence>
    </AppLayout>
  );
}

function VerifyAccountForm() {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || { email: "" };

  const verifyMutation = useVerify();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<VerifyEmailForm>({
    defaultValues: {
      email,
    },
  });

  const onSubmit: SubmitHandler<VerifyEmailForm> = async (data) => {
    try {
      await verifyMutation.mutateAsync(data);

      showAlert(
        "Successfully sent verification email, please check your email for confirmation",
        "success",
      );
      navigate("/");
    } catch (error) {
      const axiosError = error as AxiosError<Record<string, string>>;

      if (axiosError.response?.data) {
        const backendErrors = axiosError.response.data;

        Object.entries(backendErrors).forEach(([field, message]) => {
          setError(field as keyof VerifyEmailForm, {
            type: "server",
            message,
          });
        });
      } else {
        showAlert("Something went wrong. Please try again.", "error");
      }
    }
  };
  return (
    <motion.form
      initial={{
        opacity: 0,
        translateY: -0.3,
      }}
      animate={{
        opacity: 1,
        translateY: 0,
      }}
      transition={{
        duration: 0.8,
        ease: "easeIn",
      }}
      className="space-y-1 md:space-y-2 relative"
    >
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

      <Button
        className={"flex items-center gap-2 rounded w-full mt-4 md:mt-5"}
        onClick={handleSubmit(onSubmit)}
        loading={verifyMutation.isPending}
        disabled={verifyMutation.isPending}
      >
        <span className="text-xs md:text-sm lg:text-base font-sans text-gray-200 tracking-wide">
          Send Verification Link
        </span>
        <PaperAirplaneIcon
          className={"size-3 md:size-4 lg:size-5 text-gray-200"}
        />
      </Button>
    </motion.form>
  );
}
