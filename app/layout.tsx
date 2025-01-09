import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import SocialButtons from "./components/SocialButtons";
import "./globals.css";

const redHat = Red_Hat_Display({
  weight: ["300", "400", "600", "900"],
  style: "normal",
  variable: "--font-red-hat",
  subsets: ["latin"],
  // display: "swap",
  // fallback: ["system-ui", "arial"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Colaia DEV",
  description:
    "Personal presentation of self-taught fullstack coder based in the Warrington, UK.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://code.iconify.design/iconify-icon/2.2.0/iconify-icon.min.js"></script>
      </head>
      <body className={`${redHat.variable} antialiased`}>
        <header className="fixed left-0 right-0 z-10">
          <div className="max-w-screen-xl mx-auto flex justify-end p-4 md:p-8">
            <SocialButtons />
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
