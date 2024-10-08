import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Formit Ai Form Builder",
  description: "Created By Md Galib Hossain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

    <html lang="en" data-theme='light'>
      <body className={inter.className}>
        <Header/>
        <Toaster position="top-center" richColors/>
        {children}


      </body>
    </html>
    </ClerkProvider>
  );
}
