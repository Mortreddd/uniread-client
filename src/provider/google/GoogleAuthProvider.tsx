import { GoogleOAuthProvider } from "@react-oauth/google";
import { PropsWithChildren } from "react";

interface GoogleAuthProviderProps extends PropsWithChildren {}

export default function GoogleAuthProvider({
  children,
}: GoogleAuthProviderProps) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
}
