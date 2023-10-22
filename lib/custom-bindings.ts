import { providers } from "ethers";
import { IBindings } from "@lens-protocol/react-web";

class CustomBindings implements IBindings {
  private signer: providers.JsonRpcSigner | null = null;
  private provider: providers.JsonRpcProvider | null = null;

  async getProvider() {
    if (this.provider === null) {
      throw new Error("Provider is not set");
    }
    return this.provider;
  }

  async getSigner() {
    if (this.signer === null) {
      throw new Error("Signer is not set");
    }
    return this.signer;
  }

  update({
    signer,
    provider,
  }: {
    signer: providers.JsonRpcSigner;
    provider: providers.JsonRpcProvider;
  }) {
    this.signer = signer;
    this.provider = provider;
  }
}

export const bindings = new CustomBindings();
