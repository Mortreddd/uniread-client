import { googleAuth, googleProvider } from "@/provider/google/GoogleProvider";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";

interface GoogleUserProps {
  email: string | null;
  googleUuid: string | null;
  image: string | null;
  username: string | null;
}
export default async function useGoogleLogin() {
  const [user, setUser] = useState<GoogleUserProps | null>(null);
  await signInWithPopup(googleAuth, googleProvider)
    .then((result) => {
      const { email, uid, photoURL, displayName } = result.user;
      setUser({
        ...user,
        email,
        googleUuid: uid,
        image: photoURL,
        username: displayName,
      });
    })
    .catch((error) => {
      throw new Error(error);
    });
}
