import { Button } from "@/components/common/form/Button";
import GoogleAuthButton from "@/components/common/form/GoogleAuthButton";
import { Input } from "@/components/common/form/Input";
import Label from "@/components/common/form/Label";
import Select from "@/components/common/form/Select";
import GuestNavbar from "@/components/common/navbar/GuestNavbar";
import api from "@/services/ApiService";
import { UserRegistration } from "@/types/Auth";
import { ErrorResponse } from "@/types/Error";
import { SuccessResponse } from "@/types/Success";
import { AxiosError, AxiosResponse } from "axios";
import { motion } from "motion/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SocialIcon } from "react-social-icons";

export default function UserRegisterationPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
    setError,
    setFocus,
  } = useForm<UserRegistration>({
    defaultValues: {
      gender: "OTHER",
    },
  });

  console.log(errors);

  const onSubmit: SubmitHandler<UserRegistration> = async (data) => {
    const { password, confirmPassword } = data;
    console.log(data);
    if (password !== confirmPassword) {
      // Handle password mismatch
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      setFocus("confirmPassword");

      return;
    }

    await api
      .post("/auth/register", data)
      .then((response: AxiosResponse<SuccessResponse>) => {
        console.log(response);
        navigate("/", { replace: true });
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        console.log(error);
        setError("root", {
          message: error.response?.data.message || "An error occurred",
        });
      });

    console.log("Registration successful:", data);
  };

  return (
    <>
      <header className="w-full relative">
        <GuestNavbar />
      </header>
      <div className={"min-h-screen w-full flex"}>
        <motion.section
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: "easeInOut",
            },
          }}
          className="flex-1 flex py-10 bg-white"
        >
          <div className={"mx-auto w-lg"}>
            <div className="relative mb-4">
              <h1 className={"text-4xl text-center font-bold mb-2"}>
                Create an Account
              </h1>
            </div>
            <div className="w-full flex items-center">
              <div className="flex-1 border-t border-solid border-primary"></div>
              <p className="mx-2 text-sm font-serif font-medium">REGISTER</p>
              <div className="flex-1 border-t border-solid border-primary"></div>
            </div>
            <div className="mx-auto w-fit my-2">
              <div className="inline-flex justify-center gap-2 items-center">
                <SocialIcon
                  network="facebook"
                  className="transition-colors duration-200 ease-in-out text-gray-200"
                  style={{ height: "2rem", width: "2rem" }}
                />
                <GoogleAuthButton />
              </div>
            </div>

            <div className="w-full flex items-center">
              <div className="flex-1 border-t border-solid border-primary"></div>
              <p className="mx-2 text-sm font-serif font-medium">OR</p>
              <div className="flex-1 border-t border-solid border-primary"></div>
            </div>
            {errors.root && (
              <div className="w-full my-4">
                <p className="p-4 rounded-md bg-red-600 text-white font-thin text-md font-serif">
                  {errors.root.message}
                </p>
              </div>
            )}

            {errors.confirmPassword && (
              <div className="w-full my-4">
                <p className="p-4 rounded-md bg-red-600 text-white font-thin text-md font-serif">
                  {errors.confirmPassword.message}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={"mb-2 flex gap-2"}>
                <div className="flex-1">
                  <Label
                    htmlFor="first-name"
                    className={"block text-sm font-medium mb-2"}
                  >
                    First Name
                  </Label>
                  <Input
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    variant={"primary"}
                    className={"w-full"}
                  />
                </div>
                <div className="flex-1">
                  <Label
                    htmlFor="last-name"
                    className={"block text-sm font-medium mb-2"}
                  >
                    Last Name
                  </Label>
                  <Input
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    variant={"primary"}
                    className={"w-full"}
                  />
                </div>
              </div>
              <div className={"mb-2 flex gap-2"}>
                <div className="flex-1">
                  <Label
                    htmlFor="username"
                    className={"block text-sm font-medium mb-2"}
                  >
                    Username
                  </Label>
                  <Input
                    {...register("username", {
                      required: "Username is required",
                    })}
                    variant={"primary"}
                    className={"w-full"}
                  />
                </div>
                <div className="flex-1">
                  <Label
                    htmlFor={"gender"}
                    className={"block text-sm font-medium mb-2"}
                  >
                    Gender
                  </Label>
                  <Controller
                    name={"gender"}
                    control={control}
                    rules={{ required: "Gender is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        variant={"primary"}
                        className={"w-full"}
                      >
                        <Select.Option value={"MALE"}>Male</Select.Option>
                        <Select.Option value={"FEMALE"}>Female</Select.Option>
                        <Select.Option value={"OTHER"}>Other</Select.Option>
                      </Select>
                    )}
                  />
                </div>
              </div>
              <div className={"mb-2"}>
                <Label
                  htmlFor="email"
                  className={"block text-sm font-medium mb-2"}
                >
                  Email
                </Label>
                <Input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email is invalid",
                    },
                  })}
                  variant={"primary"}
                  className={"w-full"}
                />
              </div>
              <div className={"mb-2"}>
                <Label
                  htmlFor="password"
                  className={"block text-sm font-medium mb-2"}
                >
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  variant={"primary"}
                  className={"w-full"}
                />
              </div>
              <div className={"mb-6"}>
                <Label
                  htmlFor="confirmPassword"
                  className={"block text-sm font-medium mb-2"}
                >
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  variant={"primary"}
                  className={"w-full"}
                />
              </div>
              <Button
                variant={"primary"}
                type={"submit"}
                loading={isSubmitting}
                className={"w-full rounded"}
              >
                Create Account
              </Button>
            </form>
          </div>
        </motion.section>
        <section className="flex-1 flex items-center p-10 bg-white"></section>
      </div>
    </>
  );
}
