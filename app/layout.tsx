import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maithil Cuisine — Tradition of Taste",
  description:
    "Experience the authentic flavors of Mithila. Traditional Maithili cuisine bringing the heritage of Bihar and Nepal to your plate.",
  openGraph: {
    title: "Maithil Cuisine — Tradition of Taste",
    description:
      "Experience the authentic flavors of Mithila. Traditional Maithili cuisine bringing the heritage of Bihar and Nepal to your plate.",
    images: [{ url: "/logo.png", width: 512, height: 512 }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Maithil Cuisine — Tradition of Taste",
    description:
      "Experience the authentic flavors of Mithila. Traditional Maithili cuisine bringing the heritage of Bihar and Nepal to your plate.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
