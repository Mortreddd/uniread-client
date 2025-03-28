import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "./Button";
import { SocialIcon } from "react-social-icons";
import api from "@/services/ApiService";
import { AxiosError, AxiosResponse } from "axios";
import { LoginResponse } from "@/types/Auth";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useAlert } from "@/contexts/AlertContext";
import { ErrorResponse } from "@/types/Error";

export default function GoogleAuthButton() {
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const { login } = useAuth();
  const handleGoogleAuth = useGoogleLogin({
    onError: (error) => {
      setLoading(false);
      showAlert(
        error.error_description ?? "Unable to process the request",
        "error"
      );
    },
    onSuccess: async (response) => {
      setLoading(true);
      api
        .post("/auth/google", {
          accessToken: response.access_token,
        })
        .then((result: AxiosResponse<LoginResponse>) => {
          login(result.data);
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          showAlert(
            error.response?.data.message ?? "Unable to process login",
            "error"
          );
        })
        .finally(() => {
          setLoading(false);
        });
    },
    prompt: "consent",
  });

  return (
    <Button
      type="button"
      size={"custom"}
      variant={"transparent"}
      loading={loading}
      onClick={() => handleGoogleAuth()}
      className="rounded-full"
    >
      <SocialIcon
        network="google"
        className="transition-colors duration-200 ease-in-out"
        style={{ height: "2rem", width: "2rem" }}
      />
    </Button>
  );
}
