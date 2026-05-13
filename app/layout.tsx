import type { Metadata } from "next";
import { Montserrat, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "DanBilDad - Creative Developer Portfolio",
  description:
    "Building unapologetic digital experiences that break the mold and command attention.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
    >
      <head></head>
      <body className="min-h-full flex flex-col font-body bg-surface text-pure-black overflow-x-hidden selection:bg-neon-pink selection:text-white">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
