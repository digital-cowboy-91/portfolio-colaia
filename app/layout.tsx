import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
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
        <main className="rounded-[1rem] relative overflow-hidden mb-4 p-4">
          <menu
            className={`
                absolute bottom-0 z-10
                flex flex-row-reverse items-center gap-8 p-4
                uppercase text-xl tracking-wider 
              `}
            style={{
              transform:
                // "translate(0%, 50%) rotate(90deg) translate(-100%, -50%)", // text top to bottom
                "translate(0%, 50%) rotate(-90deg) translate(0%, 50%)", // text bottom to top
              transformOrigin: "left",
            }}
          >
            <Link href="/" className="flex place-content-center">
              <Icon
                icon="codicon:arrow-up"
                width="1.75rem"
                className="rotate-90"
              />
            </Link>
            <Link href="/profile">Profile</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/journey">Journey</Link>
            <span className="w-32 border-b border-foreground" />
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
