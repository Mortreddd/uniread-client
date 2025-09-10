import { Input } from "@/components/common/form/Input";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfileSettings() {
  const { user } = useAuth();

  return (
    <section className="w-full h-full relative bg-transparent px-6">
      <h1 className="text-2xl font-bold font-serif text-gray-800">
        Profile Settings
      </h1>
      <p className="mt-2 text-gray-600">Manage your profile settings here.</p>

      <div className="mt-5 flex justify-between items-center">
        <Input value={user?.firstName} placeholder={"First Name"} />
      </div>
    </section>
  );
}
