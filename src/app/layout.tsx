import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "800"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "800"] });
export const metadata: Metadata = {
  title: "PicMorph",
  description: "Privacy Guaranteed: Image Conversion Without Servers, on your Browser only!",
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

      </body>

    </html>
  );
}
