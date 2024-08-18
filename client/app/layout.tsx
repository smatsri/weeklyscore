import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FirebaseProvider from "@/components/Firebase/FirebaseProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weeklyscore",
  description: "wip",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FirebaseProvider>{children}</FirebaseProvider>
      </body>
    </html>
  );
}
