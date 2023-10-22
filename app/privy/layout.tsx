"use client";

import {
  LensConfig,
  LensProvider,
  development,
} from "@lens-protocol/react-web";
import { bindings as customBindings } from "@/lib/custom-bindings";

const lensConfig: LensConfig = {
  bindings: customBindings,
  environment: development,
};

export default function Client({ children }: { children: React.ReactNode }) {
  return <LensProvider config={lensConfig}>{children}</LensProvider>;
}
