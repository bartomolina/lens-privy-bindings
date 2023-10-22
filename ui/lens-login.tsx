import {
  Profile,
  ProfileSession,
  SessionType,
  useLogin,
  useLogout,
  useProfiles,
  useSession,
} from "@lens-protocol/react-web";
import { cn } from "@/lib/utils";
import { ProfileInfo } from "./profile-info";
import { ProfilesList } from "./profiles-list";

interface LensLoginProps {
  address: string;
}

export function LensLogin({ address }: LensLoginProps) {
  const profiles = useProfiles({
    where: {
      ownedBy: [address],
    },
  });
  const { data } = useSession();

  return (
    <>
      <div className={cn("text-green-800")}>
        Connected with address: {address}
      </div>
      {data?.authenticated && data.type === SessionType.WithProfile && (
        <ProfileInfo profile={data.profile} />
      )}
      {profiles.data && (
        <ProfilesList address={address} profiles={profiles.data} />
      )}
    </>
  );
}
