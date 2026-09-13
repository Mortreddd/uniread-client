import { Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { RealtimeProvider } from "./contexts/RealtimeContext";

export default function App() {
  const { user } = useAuth();

  if (!user) return <Outlet />;
  return (
    <RealtimeProvider>
      <Outlet />
    </RealtimeProvider>
  );
}
