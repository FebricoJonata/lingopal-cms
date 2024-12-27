import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "@/styles/globals.css";
import ReactQueryProvider from "../provider/ReactQueryProvider";

const lato = Lato({
  subsets: ["latin"],
  weight: "400",
});

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
      <head>
        <link rel="icon" href="assets/images/Logo_LingoPal.png" />
      </head>
      <body className={lato.className}>
        <ReactQueryProvider>
          <main>{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
