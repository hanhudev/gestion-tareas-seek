import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Gestión de Tareas Seek",
    template: "%s | Gestión de Tareas Seek",
  },
  description:
    "Aplicación web para la gestión de tareas con autenticación segura. Permite crear, editar y organizar tareas de forma eficiente.",
  keywords: [
    "gestor de tareas",
    "task manager",
    "Next.js",
    "NextAuth",
    "React",
    "CRUD",
  ],
  authors: [
    {
      name: "Hans Huiza",
    },
  ],
  creator: "Hans Huiza",
  metadataBase: new URL("https://gestion-tareas-seek.vercel.app"),
  openGraph: {
    title: "Gestión de Tareas Seek",
    description:
      "Aplicación web para la gestión de tareas con autenticación segura.",
    url: "https://gestion-tareas-seek.vercel.app",
    siteName: "Gestión de Tareas Seek",
    locale: "es_PE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { Providers } from "@/components/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
