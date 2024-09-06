import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import FirebaseProvider from "@/components/Firebase/FirebaseProvider";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Weeklyscore",
  description: "wip",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <FirebaseProvider>
          <Header />
          {children}
        </FirebaseProvider>
      </body>
    </html>
  );
}
