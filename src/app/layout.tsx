import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TickTack-Diary",
  description: "A simple time diary",
};

/**
 * Root layout component.
 * @param root0 - The root props object.
 * @param root0.children - The children elements to be rendered.
 * @returns The root layout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${notoSansJP.variable} root`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
