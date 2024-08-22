import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import FirebaseProvider from "@/components/Firebase/FirebaseProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <nav>
          <h1>Weeklyscore</h1>
        </nav>
        <FirebaseProvider>{children}</FirebaseProvider>
      </body>
    </html>
  );
}
