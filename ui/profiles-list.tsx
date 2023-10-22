import { cn } from "@/lib/utils";
import { Profile, useLogin } from "@lens-protocol/react-web";

interface PrfofilesListProps {
  profiles: Profile[];
  address: string;
}

export function ProfilesList({ profiles, address }: PrfofilesListProps) {
  const { execute: login, loading } = useLogin();

  return (
    <>
      {loading && <div className={cn("text-yellow-800")}>Logging In...</div>}
      <ul>
        {profiles.map((profile) => (
          <li
            key={profile.id}
            onClick={() => login({ address, profileId: profile.id })}
            className={cn("px-7 py-2 border border-gray-500 cursor-pointer")}
          >
            {profile.handle}
          </li>
        ))}
      </ul>
    </>
  );
}
