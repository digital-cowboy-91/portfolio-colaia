import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import Link from "next/link";
import GradientBackground from "./components/GradientBackground";
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
        <script src="https://code.iconify.design/iconify-icon/2.2.0/iconify-icon.min.js"></script>
      </head>
      <body
        className={`
          ${redHat.variable} antialiased
          h-screen p-4
          grid grid-rows-[1fr_max-content]
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
        <main className="rounded-[1rem] relative overflow-hidden mb-4">
          <menu
            className={`
                absolute bottom-0 z-10
                flex items-center gap-8 p-8
              `}
            style={{
              transform:
                "translate(0%, 50%) rotate(90deg) translate(-100%, -50%)",
              transformOrigin: "left",
            }}
          >
            <Link href="/">Home</Link>
            <Link href="/profile">Profile</Link>
            <span className="w-32 border-b border-contour" />
          </menu>
          {children}
          <GradientBackground />
        </main>
        <footer className="rounded-[1rem] relative overflow-hidden bg-foreground p-4">
          <ToolsClient data={tools} />
        </footer>
      </body>
    </html>
  );
}
