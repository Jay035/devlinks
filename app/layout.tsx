import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import BodyComponent from "./body";
import { GlobalProvider } from "@/context/GlobalProvider";

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
        <GlobalProvider>
            <BodyComponent>{children}</BodyComponent>
        </GlobalProvider>
      </body>
    </html>
  );
}
