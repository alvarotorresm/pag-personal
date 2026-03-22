"use client";

import { useState } from "react";
import Link from "next/link";

interface ClaseResult {
  slug: string;
  title: string;
  tema: string;
  temaSlug: string;
}

interface TemaOption {
  slug: string;
  nombre: string;
}

export default function SearchBar({
  clases,
  temas,
}: {
  clases: ClaseResult[];
  temas: TemaOption[];
}) {
  const [query, setQuery] = useState("");
  const [temaFiltro, setTemaFiltro] = useState("");

  const isActive = query.trim() !== "" || temaFiltro !== "";

  const results = isActive
    ? clases.filter((c) => {
        const matchTitle = query.trim()
          ? c.title.toLowerCase().includes(query.toLowerCase())
          : true;
        const matchTema = temaFiltro ? c.temaSlug === temaFiltro : true;
        return matchTitle && matchTema;
      })
    : [];

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
      <h2 className="text-sm font-medium uppercase tracking-widest text-stone-500 dark:text-stone-500">
        Buscar clase
      </h2>
      <div className="mt-4 flex gap-3">
        {/* Buscador por título */}
        <div className="relative flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="search"
            placeholder="Buscar por título..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-stone-200 bg-white py-2.5 pl-9 pr-4 text-sm text-stone-900 shadow-sm outline-none placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-50 dark:placeholder:text-stone-500 dark:focus:border-amber-500"
          />
        </div>

        {/* Filtro por tema */}
        <select
          value={temaFiltro}
          onChange={(e) => setTemaFiltro(e.target.value)}
          className="rounded-lg border border-stone-200 bg-white py-2.5 pl-3 pr-8 text-sm text-stone-700 shadow-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:focus:border-amber-500"
        >
          <option value="">Todos los temas</option>
          {temas.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.nombre}
            </option>
          ))}
        </select>
      </div>

      {isActive && (
        <ul className="mt-3 divide-y divide-stone-100 rounded-lg border border-stone-200 bg-white shadow-sm dark:divide-stone-800 dark:border-stone-700 dark:bg-stone-900">
          {results.length === 0 ? (
            <li className="px-4 py-3 text-sm text-stone-500 dark:text-stone-400">
              Sin resultado
            </li>
          ) : (
            results.map((clase) => (
              <li key={clase.slug}>
                <Link
                  href={`/clases/${clase.slug}`}
                  className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-stone-50 dark:hover:bg-stone-800"
                >
                  <span className="text-sm font-medium text-stone-900 dark:text-stone-50">
                    {clase.title}
                  </span>
                  <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    {clase.tema}
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
