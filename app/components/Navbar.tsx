"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface TemaNav {
  slug: string;
  nombre: string;
}

export default function Navbar({ temas }: { temas: TemaNav[] }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-stone-200 bg-white/80 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Logo / Titulo */}
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-stone-900 dark:text-stone-50"
        >
          La libreta de ATM
        </Link>

        {/* Dropdown de Temas */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3.5 py-2 text-sm font-medium text-stone-700 shadow-sm transition-colors hover:bg-stone-50 hover:border-stone-300 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:border-stone-600"
            aria-expanded={open}
            aria-haspopup="true"
          >
            Temas
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg border border-stone-200 bg-white py-1 shadow-lg dark:border-stone-700 dark:bg-stone-900">
              {temas.length === 0 ? (
                <p className="px-4 py-2 text-sm text-stone-500 dark:text-stone-400">
                  No hay temas disponibles
                </p>
              ) : (
                temas.map((tema) => (
                  <Link
                    key={tema.slug}
                    href={`/temas/${tema.slug}`}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm text-stone-700 transition-colors hover:bg-stone-100 hover:text-amber-600 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-amber-500"
                  >
                    {tema.nombre}
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
