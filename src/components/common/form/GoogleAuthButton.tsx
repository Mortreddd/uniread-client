import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "./Button";
import { SocialIcon } from "react-social-icons";
import api from "@/services/ApiService";
import { AxiosError, AxiosResponse } from "axios";
import { LoginResponse } from "@/types/Auth";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { ErrorResponse } from "@/types/Error";
import GoogleAuthProvider from "@/provider/google/GoogleAuthProvider.tsx";

export default function GoogleAuthButton() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const handleGoogleAuth = useGoogleLogin({
    onError: (error) => {
      setLoading(false);
      console.log(error)
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

          console.log(error)
        })
        .finally(() => {
          setLoading(false);
        });
    },
    prompt: "consent",
  });

  return (
      <GoogleAuthProvider>

    <Button
      type="button"
      size={"custom"}
      variant={"transparent"}
      disabled={loading}
      onClick={() => handleGoogleAuth()}
      className="rounded-full"
    >
      <SocialIcon
        network="google"
        className="transition-colors duration-200 ease-in-out"
        style={{ height: "2rem", width: "2rem" }}
      />
    </Button>
      </GoogleAuthProvider>
  );
}
