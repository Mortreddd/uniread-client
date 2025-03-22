import Modal, { ModalRef } from "../Modal";
import { Button } from "../../form/Button";
import {Input} from "../../form/Input";
import { SocialIcon } from "react-social-icons";
import { forwardRef, Ref } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginForm, LoginResponse } from "@/types/Auth";
import api from "@/services/ApiService";
import { AxiosError, AxiosResponse } from "axios";
import { useAuth } from "@/contexts/AuthContext";
import DangerAlert from "../../alert/DangerAlert";
import {ErrorResponse} from "@/types/Error.ts";

interface LoginModalProps {}

function LoginModal({}: LoginModalProps, ref: Ref<ModalRef>) {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    api
      .post("/auth/login", data)
      .then((response: AxiosResponse<LoginResponse>) => {
        login(response.data);
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        console.log(error);
      });
  };

  return (
    <Modal ref={ref}>
      <div className="rounded p-6 space-y-1 bg-white w-96">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-primary text-3xl text-center font-serif font-medium block">
            Login
          </h1>
          <div className="border-primary p-3 flex flex-col items-start gap-3">
            {errors?.root && (
              <DangerAlert iconSize="sm">Invalid email or password</DangerAlert>
            )}
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
            <div className="w-full flex justify-between">
              <p className="text-black text-sm">Remember Me</p>
              <p className="text-primary text-sm">Forgot password?</p>
            </div>
          </div>

          <Button
            loading={isLoading}
            type="submit"
            className="rounded w-full disabled:bg-priamry/50 font-medium text-white"
            variant={"primary"}
          >
            Login
          </Button>
        </form>

        <div className="w-full text-center">
          <p className="text-sm font-sans text-black font-medium">OR</p>
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
          <Button
            type="button"
            size={"custom"}
            variant={"transparent"}
            className="rounded-full"
          >
            <SocialIcon
              network="google"
              className="transition-colors duration-200 ease-in-out"
              style={{ height: "2rem", width: "2rem" }}
            />
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default forwardRef(LoginModal);
