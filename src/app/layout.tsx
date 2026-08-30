import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CybertronianTextReveal } from "@/components/CybertronianTextReveal";
import { Header } from "@/components/Header";
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
      <body className="min-h-full bg-[#11100e] text-[#e38b5b]">
        <div
          className="mx-auto min-h-full w-full max-w-5xl px-6 sm:px-10"
          data-scramble-root
        >
          <Header />
          <main>{children}</main>
        </div>
        <CybertronianTextReveal />
      </body>
    </html>
  );
}
