import { cn } from "@/lib/utils";
import { Profile, useLogout } from "@lens-protocol/react-web";

interface ProfileInfoProps {
  profile: Profile;
}

export function ProfileInfo({ profile }: ProfileInfoProps) {
  const { execute: logout } = useLogout();

  return (
    <>
      <div className={cn("text-green-800")}>
        Logged in with handle: {profile.handle}
      </div>
      <button
        className={cn(
          "text-white py-2 px-4 rounded-md bg-red-800 hover:bg-red-700"
        )}
        onClick={() => logout()}
      >
        Log out
      </button>
    </>
  );
}
