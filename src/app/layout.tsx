import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import Header from "./components/Header/Header";
import { ChatWidget } from "./components/AI/ChatWidget";
import { Toaster } from "./components/ShadcnUI/Sonner";

import doggysearch_wallpaper from "../../public/doggysearch-wallpaper.png";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DoggySearch",
  description: "Made with love, save the pups!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isAuthenticatedCookie = cookieStore.get("isAuthenticated");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        style={{
          backgroundImage: `url(${doggysearch_wallpaper.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <Header isAuthenticated={isAuthenticatedCookie} />
        <main className="flex-grow">{children}</main>
        <Toaster toastClassName="bg-slate-200" duration={1000} />
        <ChatWidget />
        <footer className="bg-white bg-opacity-80 shadow-md mt-8">
          <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
            © 2023 DogSearch. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
