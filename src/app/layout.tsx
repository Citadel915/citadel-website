import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Citadel",
  description: "Vehicle Custody & Asset Intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
