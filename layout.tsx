import type { Metadata } from "next";
import { Inter } from "next/font/google";
// TEMPORARILY DISABLED: Clerk disabled for testing
// import { ClerkProvider } from "@clerk/nextjs";
import { MemoryKeeperLogo } from "@/components/icons";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Memory Keeper - Save their story before memories fade",
  description: "A free tool for dementia families to capture their loved one's story—who they are, what matters to them—before memories fade. Share with family. Keep safe forever.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // TEMPORARILY DISABLED: ClerkProvider disabled for testing
    // <ClerkProvider>
      <html lang="en-GB">
        <body className={inter.className}>{children}</body>
      </html>
    // </ClerkProvider>
  );
}

