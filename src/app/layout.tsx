import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oscar Murillo — Full Stack Developer & AI Integrator",
  description:
    "Full Stack Developer, AI Integrator and Web Designer based in Latin America. Building high-quality digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${font.variable} antialiased`}>
      <body className="min-h-screen bg-white overflow-x-hidden">
        <CustomCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
