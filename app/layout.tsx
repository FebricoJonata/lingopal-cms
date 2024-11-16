import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import ReactQueryProvider from "../provider/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LingoPal CMS",
  description: "Content Management System for LingoPal Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <main>{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
