import { GoogleAuthProvider, getAuth } from "firebase/auth";
import fireabaseApp from "../FirebaseConfiguration";
const googleProvider = new GoogleAuthProvider();

const googleAuth = getAuth(fireabaseApp);

export { googleAuth, googleProvider };
