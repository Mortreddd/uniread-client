import Modal, { ModalRef } from "../Modal";
import { Button } from "../../form/Button";
import { Input } from "../../form/Input";
import { SocialIcon } from "react-social-icons";
import { forwardRef, Ref } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginForm, LoginResponse } from "@/types/Auth";
import api from "@/services/ApiService";
import { AxiosError, AxiosResponse } from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { ErrorResponse } from "@/types/Error.ts";
import GoogleAuthButton from "../../form/GoogleAuthButton";
import { AnimatePresence, motion } from "motion/react";

interface LoginModalProps {}

function LoginModal({}: LoginModalProps, ref: Ref<ModalRef>) {
  const { login } = useAuth();
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

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    await api
      .post("/auth/login", data)
      .then((response: AxiosResponse<LoginResponse>) => {
        login(response.data);
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        console.log(error);
        setError("root", {
          message: error.response?.data.message || "Unable to Login",
        });
      });
  };

  return (
    <Modal ref={ref}>
      <div className="rounded-xs p-3 space-y-1 bg-white w-96">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-primary text-3xl text-center font-serif font-medium block">
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
                  className="w-full rounded bg-red px-3 py-2 text-white bg-red-600 font-serif"
                >
                  {errors.root.message}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="w-full">
              <Input
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                placeholder="Enter email"
                variant={"primary"}
                className="w-full text-lg"
              />
            </div>
            <div className="w-full">
              <Input
                {...register("password", {
                  required: "Password is required",
                })}
                type="password"
                placeholder="Enter password"
                variant={"primary"}
                className="w-full text-lg"
              />
            </div>
            <div className="w-full flex justify-end">
              <p className="text-primary text-sm">Forgot password?</p>
            </div>
          </div>

          <Button
            loading={isSubmitting}
            type="submit"
            className="rounded-xs w-full disabled:bg-priamry/50 font-medium text-white"
            variant={"primary"}
          >
            Login
          </Button>
        </form>

        <div className="w-full flex items-center text-center">
          <div className={"flex-1 border border-solid border-primary"}></div>
          <p className="text-sm font-sans text-black font-medium mx-3">OR</p>
          <div className={"flex-1 border border-solid border-primary"}></div>
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
          <p className="text-md font-serif text-gray-800">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-primary transition-all duration-200 ease-in-out hover:text-primary/80"
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
