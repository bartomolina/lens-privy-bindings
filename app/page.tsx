"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-5 gap-4">
      <Link href={"/privy"}>Privy</Link>
      <Link href={"/alchemy-aa"}>Privy + Alchemy AA</Link>
    </main>
  );
}
