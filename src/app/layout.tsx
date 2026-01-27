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
  title: "HoganOS | Don Hogan - Principal Product Manager, Growth",
  description: "Portfolio of Don Hogan - Principal Product Manager specializing in Growth, A/B Testing, and Product-Led Growth. 8+ years helping companies like Indeed, Mattermost, and ZenBusiness turn experimentation into results.",
  keywords: ["product manager", "growth PM", "A/B testing", "experimentation", "PLG", "product-led growth", "portfolio", "HoganOS", "conversion optimization"],
  authors: [{ name: "Don Hogan" }],
  openGraph: {
    title: "HoganOS | Don Hogan - Principal Product Manager, Growth",
    description: "Just a dude having fun. Growth PM with a track record of turning experimentation into real business results.",
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
