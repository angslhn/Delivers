import type { JSX, ReactNode } from "react";

import App from "@/container/App";
import Alert from "@/element/Alert";
import Header from "@/layout/Header";
import Menu from "@/layout/Menu";

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
          <Alert />
          <Header />
          {children}
          <Menu />
        </App>
      </body>
    </html>
  );
}
