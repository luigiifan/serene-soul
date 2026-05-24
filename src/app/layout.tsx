import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Serene Soul | Premium Yoga Events & Classes",
  description: "Temukan kedamaian dan harmoni tubuh melalui kelas yoga premium kami. Vinyasa, Hatha, Yin, dan meditasi dengan aksen pink & putih yang elegan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
