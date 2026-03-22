import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import { getTemas } from "@/lib/clases";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gestion de Proyectos Informaticos",
  description: "Profesor de Gestion de Proyectos Informaticos. Material de clases y recursos.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const temas = await getTemas();

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar temas={temas.map((t) => ({ slug: t.slug, nombre: t.nombre }))} />
        {children}
        <footer className="border-t border-stone-200 dark:border-stone-800 mt-16">
          <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-stone-500 dark:text-stone-400">
            <span>© {new Date().getFullYear()} Álvaro Torres M.</span>
            <a
              href="mailto:alvaro.i.torresm@gmail.com"
              className="hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
            >
              Correo: alvaro.i.torresm@gmail.com
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
