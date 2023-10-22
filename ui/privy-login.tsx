import { usePrivy } from "@privy-io/react-auth";
import { cn } from "@/lib/utils";
import { useLogout } from "@lens-protocol/react-web";

export function PrivyLogin() {
  const { authenticated, login, logout } = usePrivy();
  const { execute: lensLogout } = useLogout();

  return (
    <button
      className={cn("text-white py-2 px-4 rounded-md", {
        "bg-blue-800 hover:bg-blue-700": !authenticated,
        "bg-red-800 hover:bg-red-700": authenticated,
      })}
      onClick={() => {
        if (!authenticated) {
          login();
        } else {
          lensLogout();
          logout();
        }
      }}
    >
      {!authenticated ? "Connect" : "Disconnect"}
    </button>
  );
}
