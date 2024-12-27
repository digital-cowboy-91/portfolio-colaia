import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import SocialButtons from "./components/SocialButtons";
import "./globals.css";

const redHat = Red_Hat_Display({
  weight: ["300", "600", "900"],
  style: "normal",
  variable: "--font-red-hat",
  subsets: ["latin"],
  // display: "swap",
  // fallback: ["system-ui", "arial"],
  preload: true,
});

export const metadata: Metadata = {
  title: "DEV: Colaia.dev",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${redHat.variable} antialiased`}>
        <header className="fixed left-0 right-0">
          <div className="max-w-screen-xl mx-auto flex justify-end p-4 md:p-8">
            <SocialButtons />
          </div>
        </header>
        <main className="max-w-screen-xl mx-auto h-[300vh]">{children}</main>
      </body>
    </html>
  );
}
