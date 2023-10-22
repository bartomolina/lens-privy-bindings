"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { bindings as customBindings } from "@/lib/custom-bindings";
import { PrivyLogin } from "@/ui/privy-login";
import { LensLogin } from "@/ui/lens-login";
import { cn } from "@/lib/utils";
import { AlchemyAAContext } from "./alchemy-aa";
import { providers } from "ethers";
import { EthersProviderAdapter } from "@alchemy/aa-ethers";
import { useWallets } from "@privy-io/react-auth";

export default function Privy() {
  const { wallets } = useWallets();
  const [address, setAddress] = useState<string | null>();
  const { signer, provider } = useContext(AlchemyAAContext);

  const primaryWallet = wallets && wallets[0] ? wallets[0] : null;

  const updateBindings = useCallback(
    async (
      provider: EthersProviderAdapter,
      signer: providers.JsonRpcSigner
    ) => {
      try {
        customBindings.update({
          signer: signer,
          provider: provider,
        });
      } catch (error) {
        console.error("Failed to update bindings:", error);
      }
    },
    []
  );

  // updates bindings once connected
  useEffect(() => {
    if (provider && signer && primaryWallet) {
      updateBindings(provider, signer);
      setAddress(primaryWallet.address);
    } else {
      setAddress(null);
    }
  }, [provider, signer, primaryWallet, updateBindings]);

  return (
    <main className={cn("flex min-h-screen flex-col items-center p-5 gap-4")}>
      <PrivyLogin />
      {address && <LensLogin address={address} />}
    </main>
  );
}
