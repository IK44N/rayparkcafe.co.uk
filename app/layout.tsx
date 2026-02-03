import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ray Park Café - Exceptional Coffee & Fresh Food",
  description: "A neighborhood gathering place in Ray Park serving exceptional coffee and freshly prepared food.",
  keywords: ["café", "coffee", "Ray Park", "coffee shop", "local café"],
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
