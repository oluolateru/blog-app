import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ClientPreloader } from "@/components/client-preloader"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Blog App",
  description: "A Blog App application built with Next.js, TypeScript, and Drizzle ORM",
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ClientPreloader />
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
