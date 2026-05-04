import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Providers } from "@/components/providers";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shelves & Stories | Online Book Borrowing",
  description:
    "Explore, filter, and borrow books digitally with a modern library experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className="h-full" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${fraunces.variable} flex min-h-full flex-col font-sans antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
