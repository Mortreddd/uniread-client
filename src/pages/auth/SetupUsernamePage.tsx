import ApplicationLogo from "@/components/ApplicationLogo";
import DangerAlert from "@/components/common/alert/DangerAlert";
import { Button } from "@/components/common/form/Button";
import { Input } from "@/components/common/form/Input";
import { useAlert } from "@/contexts/AlertContext";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/ApiService";
import { ErrorResponse } from "@/types/Error";
import { SuccessResponse } from "@/types/Success";
import { randomUsername } from "@/utils/Names";
import { AxiosError, AxiosResponse } from "axios";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface SetupUsernameProps {
  username: string;
}

export default function SetupUsernamePage() {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const suggestedUsername = useMemo(() => {
    return randomUsername(user?.firstName, user?.lastName);
  }, [user?.firstName, user?.lastName]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SetupUsernameProps>({
    defaultValues: {
      username: user?.username,
    },
  });

  const onSubmit: SubmitHandler<SetupUsernameProps> = async ({ username }) => {
    await api
      .put(`/users/${user?.id}/setup/username`, {
        username,
      })
      .then((response: AxiosResponse<SuccessResponse>) => {
        showAlert(response.data.message, "success");
        navigate("/", { replace: true });
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        setError("username", {
          message: error.response?.data.message,
        });
      });
  };

  return (
    <main className="w-full antialiased h-screen">
      <div className="md:px-20 md:py-6 px-6 py-3 flex justify-center items-center w-full h-full">
        <div className="rounded-xl w-1/3 shadow-lg border h-fit px-8 py-6">
          <ApplicationLogo size={"md"} className={"my-2 mx-auto"} />
          <h1 className="text-2xl font-sans font-semibold text-black text-center">
            Set up your username
          </h1>
          <p className="text-sm font-sans font-normal text-gray-500 text-center">
            This will be your public username.
          </p>

          {errors?.username && (
            <DangerAlert>{errors.username.message}</DangerAlert>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full space-y-3"
          >
            <div className="w-full">
              <label
                htmlFor="username"
                className="text-xl mb-2 block font-sans text-gray-600 font-semibold"
              >
                Username
              </label>
              <Input
                {...register("username", {
                  required: "The useranme is required",
                })}
                variant={"primary"}
                className={"block w-full"}
                placeholder={`${suggestedUsername}`}
              />
            </div>
            <Button
              loading={isSubmitting}
              type={"submit"}
              variant={"primary"}
              className={"rounded"}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
