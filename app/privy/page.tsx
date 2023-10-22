"use client";

import { ConnectedWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import { useCallback, useEffect, useState } from "react";
import { bindings as customBindings } from "@/lib/custom-bindings";
import { PrivyLogin } from "@/ui/privy-login";
import { LensLogin } from "@/ui/lens-login";
import { cn } from "@/lib/utils";

export default function Privy() {
  const { wallets } = useWallets();
  const { authenticated } = usePrivy();
  const [address, setAddress] = useState<string | null>();

  const primaryWallet = wallets && wallets[0] ? wallets[0] : null;

  const updateBindings = useCallback(async (wallet: ConnectedWallet) => {
    try {
      await wallet.switchChain(80001);
      const provider = await wallet.getEthersProvider();
      const signer = provider.getSigner();
      customBindings.update({
        signer,
        provider,
      });
    } catch (error) {
      console.error("Failed to update bindings:", error);
    }
  }, []);

  // updates bindings once connected
  useEffect(() => {
    if (authenticated && primaryWallet) {
      updateBindings(primaryWallet);
      setAddress(primaryWallet.address);
    } else {
      setAddress(null);
    }
  }, [authenticated, primaryWallet, updateBindings]);

  return (
    <main className={cn("flex min-h-screen flex-col items-center p-5 gap-4")}>
      <PrivyLogin />
      {address && <LensLogin address={address} />}
    </main>
  );
}
