import type { Metadata } from "next";
import "./globals.css";
import { nanumSquare } from "./fonts";
import Header from "@/shared/ui/Header";

export const metadata: Metadata = {
  title: "Next App",
  description: "Next.js + TS + Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={nanumSquare.variable}>
      <body className="font-sans antialiased bg-[rgb(var(--color-bg-default))] text-[rgb(var(--color-text-default))]">
        <Header />
        <main className="min-h-screen p-6">
          <div className="w-full max-w-300 mx-auto">{children}</div>
        </main>
      </body>
    </html>
  );
}
