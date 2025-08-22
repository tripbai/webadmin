import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/providers/StoreProvider";
import AuthProvider from "@/providers/AuthProvider";
import TanStackQueryProvider from "@/providers/TanStackQueryProvider";

export const metadata: Metadata = {
  title: "Tripbai - Webadmin",
  description: "Webadmin panel for Tripbai",
};

const outfit = Outfit({
  subsets: ["latin"], // you can add "latin-ext" if needed
  display: "swap", // recommended for performance
  variable: "--font-outfit", // optional: allows usage in Tailwind
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <TanStackQueryProvider>
        <html lang="en">
          <body className={`${outfit.className} antialiased`}>
            <AuthProvider>{children}</AuthProvider>
          </body>
        </html>
      </TanStackQueryProvider>
    </StoreProvider>
  );
}
