import type { Metadata } from "next";

import "./globals.css";
import { cn } from "@/lib/utils";
import FirebaseProvider from "@/components/Firebase/FirebaseProvider";
import HeaderContainer from "./_components/HeaderContainer";
import rubik from "@/fonts/rubik";

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
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background", rubik.className)}>
        <FirebaseProvider>
          <HeaderContainer />
          {children}
        </FirebaseProvider>
      </body>
    </html>
  );
}
