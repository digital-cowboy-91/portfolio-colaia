import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://code.iconify.design/iconify-icon/2.2.0/iconify-icon.min.js"
          async
        />
      </head>
      <body
        className={`
          ${redHat.variable} antialiased
        `}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
