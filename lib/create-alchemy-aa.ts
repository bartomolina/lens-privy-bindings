import { env } from "@/env.mjs";
import {
  getDefaultLightAccountFactory,
  LightSmartContractAccount,
} from "@alchemy/aa-accounts";
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { SmartAccountSigner, WalletClientSigner } from "@alchemy/aa-core";
import { Alchemy, Network } from "alchemy-sdk";
import {
  AccountSigner,
  EthersProviderAdapter,
  convertEthersSignerToAccountSigner,
} from "@alchemy/aa-ethers";
import { ConnectedWallet } from "@privy-io/react-auth";
import { Transport } from "viem";
import { polygonMumbai } from "viem/chains";
import { providers } from "ethers";

const entryPointAddress = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

export type AlchemyAAResult = {
  signer: providers.JsonRpcSigner | undefined;
  provider: EthersProviderAdapter | undefined;
};

export const createAlchemyAA = async (wallet: ConnectedWallet) => {
  const alchemy = new Alchemy({
    apiKey: env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.MATIC_MUMBAI,
  });
  const ethersProvider = await alchemy.config.getProvider();

  const privyProvider = await wallet.getEthersProvider();
  const privySigner = privyProvider.getSigner();

  const provider = EthersProviderAdapter.fromEthersProvider(
    ethersProvider,
    entryPointAddress
  );
  const owner = convertEthersSignerToAccountSigner(privySigner);

  provider.connectToAccount(
    (rpcClient) =>
      new LightSmartContractAccount({
        entryPointAddress,
        chain: polygonMumbai,
        factoryAddress: getDefaultLightAccountFactory(polygonMumbai),
        rpcClient,
        owner,
      })
  );
  const signer = provider.getSigner();

  return { signer, provider };
};
