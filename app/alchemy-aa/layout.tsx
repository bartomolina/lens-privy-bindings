"use client";

import {
  LensConfig,
  LensProvider,
  development,
} from "@lens-protocol/react-web";
import { bindings as customBindings } from "@/lib/custom-bindings";
import { AlchemyAAProvider } from "./alchemy-aa";

const lensConfig: LensConfig = {
  bindings: customBindings,
  environment: development,
};

export default function Client({ children }: { children: React.ReactNode }) {
  return (
    <AlchemyAAProvider>
      <LensProvider config={lensConfig}>{children}</LensProvider>
    </AlchemyAAProvider>
  );
}
