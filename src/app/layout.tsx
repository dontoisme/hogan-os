import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "HoganOS | Don Hogan - Software Engineer",
  description: "Portfolio of Don Hogan - Senior Software Engineer specializing in full-stack web development with React, TypeScript, and Node.js.",
  keywords: ["software engineer", "web developer", "React", "TypeScript", "portfolio", "HoganOS"],
  authors: [{ name: "Don Hogan" }],
  openGraph: {
    title: "HoganOS | Don Hogan - Software Engineer",
    description: "Portfolio of Don Hogan - Senior Software Engineer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
