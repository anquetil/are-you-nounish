import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import React from 'react'
import { CustomConnectButton } from "@/components/CustomConnectButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Are You Nounish?",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang='en'>
        <body className={` font-mono bg-yellow-300 p-12`}>
           <Providers>
               <div className="flex flex-row w-full justify-between mb-4">
                  <div className="text-3xl font-bold text-gray-950">Are You Nounish?</div>
                  <CustomConnectButton />
               </div>
              {children}
           </Providers>
        </body>
     </html>
  );
}
