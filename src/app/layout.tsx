"use client";

import "./globals.css";
import "./fontawesome";
import Navbar from "./components/nav";
import { AuthProvider } from "./contexts/authContext";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: "100%", margin: 0, overflow: "hidden" }}>
      <AuthProvider>
        <body className={inter.className}>
          <div
            style={{
              maxHeight: "100vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Navbar />
            {children}
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
