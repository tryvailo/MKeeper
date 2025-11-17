import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MemoryKeeperLogo } from "@/components/icons";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Legacy Words - Save their story before memories fade",
  description: "A free tool for dementia families to capture their loved one's story—who they are, what matters to them—before memories fade. Share with family. Keep safe forever.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

