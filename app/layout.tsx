import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./_components/Header";
import Provider from "./Provider";
import '@smastrom/react-rating/style.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Muadhang",
  description: "Aplikasi maem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Provider>{children}</Provider>
          </body>
      </html>
    </ClerkProvider>
  );
}
