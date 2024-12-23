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
      <body
        className={`${redHat.variable} antialiased max-w-screen-xl mx-auto p-8`}
      >
        <div className="fixed left-0 right-0">
          <div className="max-w-screen-xl mx-auto flex justify-end">
            <SocialButtons />
          </div>
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
