import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import SocialButtons from "./components/SocialButtons";
import ToolsClient from "./components/ToolsClient";
import "./globals.css";
import { readFile } from "./utils/persistantJSON";

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
  const tools = await readFile("tools").then((res) =>
    res.sort(() => 0.5 - Math.random())
  );

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
        <header
          className={`
              fixed z-10
              left-0 right-0
              flex justify-end
              p-8
            `}
        >
          <SocialButtons />
        </header>
        <main>{children}</main>
        <footer
          className={`fixed inset-x-0 bottom-0 p-4`}
          style={{
            backgroundImage:
              "linear-gradient(0deg, var(--background) 75%, transparent)",
          }}
        >
          <ToolsClient data={tools} />
        </footer>
      </body>
    </html>
  );
}
