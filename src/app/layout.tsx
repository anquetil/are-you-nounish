import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import React from 'react'
import { CustomConnectButton } from "@/components/CustomConnectButton";
import { MyLink } from "@/components/MyLink";

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
        <body className={` font-mono bg-yellow-300 px-4 py-6 sm:p-12`}>
           <Providers>
               <div className="flex flex-row w-full justify-between mb-4">
                  <div className="text-3xl font-bold text-gray-950">Are You Nounish?</div>
                  <div className="flex flex-col-reverse items-end sm:items-center gap-y-2 sm:gap-y-0 sm:flex-row sm:gap-x-1 md:gap-x-4">
                     <MyLink />
                     <CustomConnectButton />
                  </div>

               </div>
              {children}
           </Providers>
        </body>
     </html>
  );
}
