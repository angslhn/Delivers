import type { JSX, ReactNode } from "react";

import App from "@/app/(Wrapper)/App";
import Header from "@/components/page/Header";
import Menu from "@/components/page/Menu";
import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Delivers",
  creator: "Aang Solihin",
  description: "Dapatkan promo menarik saat berbelanja di delivers, silahkan checkout barang pilihanmu.",
  keywords: [],
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "64x64" }],
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>): JSX.Element {
  return (
    <html lang="id">
      <body>
        <App>
          <Header />
          {children}
          <Menu />
        </App>
      </body>
    </html>
  );
}
