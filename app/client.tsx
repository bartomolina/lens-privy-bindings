"use client";

import { env } from "@/env.mjs";
import { PrivyProvider } from "@privy-io/react-auth";

export default function Client({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={env.NEXT_PUBLIC_PRIVY_APP_ID}
      config={{
        loginMethods: ["wallet", "email"],
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
          noPromptOnSignature: true,
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
