import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import BodyComponent from "./body";

const instrumentSans = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevLinks",
  description: "Link Sharing app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={instrumentSans.className}>
        <BodyComponent>{children}</BodyComponent>
      </body>
    </html>
  );
}
