import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "./Button.tsx";
import { SocialIcon } from "react-social-icons";
import api from "@/core/api/ApiService.ts";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { ErrorResponse } from "@/types/Error.ts";
import GoogleAuthProvider from "@/provider/google/GoogleAuthProvider.tsx";
import { SimpleUserInfo } from "@/types/User.ts";

export default function GoogleAuthButton() {
  const [loading, setLoading] = useState(false);
  const handleGoogleAuth = useGoogleLogin({
    onError: (error) => {
      setLoading(false);
      console.log(error);
    },
    onSuccess: async (response) => {
      setLoading(true);
      api
        .post("/auth/google", {
          accessToken: response.access_token,
        })
        .then((result: AxiosResponse<SimpleUserInfo>) => {
          const { username } = result.data;

          if(username === null) {
            window.location.replace("/auth/setup-username");
            return;
          }

          window.location.reload();
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          console.log(error);
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
          className="transition-colors duration-200 ease-in-out hover:text-gray-200"
          style={{ height: "2rem", width: "2rem" }}
        />
      </Button>
    </GoogleAuthProvider>
  );
}
