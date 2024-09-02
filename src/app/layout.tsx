import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
const inter = Inter({ subsets: ["latin"], weight: ["400", "800"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "800"] });
export const metadata: Metadata = {
  title: "PicMorph",
  description: "Privacy Guaranteed! Image Conversion & Compression Without Servers, everything on your Browser!",
  icons: {
    icon: ["picmorph-logo.webp"],
    shortcut: ["picmorph-logo.webp"],
  },
  openGraph: {
    title: "PicMorph",
    description: "Privacy Guaranteed: Image Conversion Without Servers, on your Browser only!",
    url: "https://picmorph.nilaacodes.me",
    siteName: "PicMorph",
    images: [{ url: "/picmorph-og.webp", width: 1200, height: 630 }],
    locale: "en-IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={poppins.className} lang="en" suppressHydrationWarning>
      <body className="bg-zinc-900 text-white">
        {children}
        <Analytics />
      </body>

    </html>
  );
}
