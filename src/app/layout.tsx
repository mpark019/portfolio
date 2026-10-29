import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { CybertronianCursor } from "@/components/CybertronianCursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "matthew park",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#11100e] text-[#f7f5f0]">
        <CybertronianCursor />
        <div className="relative z-10 mx-auto min-h-full w-full max-w-5xl px-6 sm:px-10">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
