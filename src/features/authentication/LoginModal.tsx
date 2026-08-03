import api from "@/core/api/ApiService.ts";
import { LoginForm, LoginResponse } from "@/types/Auth.ts";
import { ErrorResponse } from "@/types/Error.ts";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { AxiosError } from "axios";
import { AnimatePresence, motion } from "motion/react";
import { forwardRef, Ref } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SocialIcon } from "react-social-icons";
import { Button } from "@/shared/components/form/Button.tsx";
import GoogleAuthButton from "@/shared/components/form/GoogleAuthButton.tsx";
import { Input } from "@/shared/components/form/Input.tsx";
import Modal, { ModalRef } from "../../shared/components/Modal.tsx";
import { useLogin } from "./hooks/useLogin.ts";

interface LoginModalProps {}

// eslint-disable-next-line no-empty-pattern
function LoginModal({}: LoginModalProps, ref: Ref<ModalRef>) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLogin();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      await loginMutation.mutateAsync(data);
      window.location.reload();
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      const data = err.response?.data;

      let message = "Unable to Login";

      if (data?.message) {
        message = data.message;
      } else if (data?.fieldErrors?.length) {
        message = Object.values(data.fieldErrors[0])[0];
      } else if (data?.errors?.length) {
        message = Object.values(data.errors[0])[0];
      }

      setError("root", { message });
    }
  };

  return (
    <Modal ref={ref}>
      <div className="rounded-xs p-3 space-y-1 bg-white max-w-96 min-w-72 md:min-w-96 dark:bg-slate-900">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-primary text-xl md:text-2xl lg:text-3xl text-center font-serif font-medium block dark:text-primary-dark">
            Login
          </h1>
          <div className="border-primary py-3 flex flex-col items-start gap-3">
            <AnimatePresence>
              {errors?.root && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.4,
                      ease: "easeOut",
                    },
                  }}
                  className="w-full flex items-center rounded bg-red px-3 py-2 text-white bg-red-600 font-serif"
                >
                  <ExclamationCircleIcon className="size-4 md:size-5 mr-2" />
                  <p>{errors.root.message}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="w-full">
              <Input
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                inputSize={"lg"}
                placeholder="Enter email"
                variant={"default"}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Input
                {...register("password", {
                  required: "Password is required",
                })}
                type="password"
                inputSize={"lg"}
                placeholder="Enter password"
                variant={"default"}
                className="w-full"
              />
            </div>
            <div className="w-full flex justify-end">
              <p className="text-primary text-xs md:text-sm dark:text-primary-dark">
                Forgot password?
              </p>
            </div>
          </div>

          <Button
            loading={isSubmitting}
            type="submit"
            className="rounded w-full"
            variant={"primary"}
          >
            Login
          </Button>
        </form>

        <div className="w-full flex items-center text-center">
          <div
            className={
              "flex-1 border border-solid border-primary dark:border-primary-dark"
            }
          ></div>
          <p className="text-xs md:text-sm font-sans text-black font-medium mx-2 md:mx-3 dark:text-white/80">
            OR
          </p>
          <div
            className={
              "flex-1 border border-solid border-primary dark:border-primary-dark"
            }
          ></div>
        </div>
        <div className="w-full flex justify-center gap-3 items-center h-fit">
          <Button
            type="button"
            size={"custom"}
            variant={"info"}
            className="rounded-full"
          >
            <SocialIcon
              network="facebook"
              className="transition-colors duration-200 ease-in-out"
              style={{ height: "2rem", width: "2rem" }}
            />
          </Button>
          <GoogleAuthButton />
        </div>
        <div className="mt-3 text-center">
          <p className="text-sm md:text-base font-serif text-gray-800 dark:text-gray-200">
            Don't have an account?{" "}
            <a
              href="/auth/register"
              className="text-primary transition-all duration-200 ease-in-out hover:text-primary/80 dark:text-primary-dark dark:hover:text-primary-dark/80"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default forwardRef(LoginModal);
