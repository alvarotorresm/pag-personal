import Link from "next/link";
import { notFound } from "next/navigation";
import { getClasesByTema, getTemas } from "@/lib/clases";
import { trackTemaView } from "@/app/actions/pageviews";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const temas = await getTemas();
  return temas.map((t) => ({ tema: t.slug }));
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function truncateContent(content: string, maxLength: number = 120): string {
  const stripped = content.replace(/\n/g, " ").trim();
  if (stripped.length <= maxLength) return stripped;
  return stripped.slice(0, maxLength).trim() + "\u2026";
}

function slugToNombre(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function TemaPage({
  params,
}: {
  params: Promise<{ tema: string }>;
}) {
  const { tema } = await params;
  const clases = await getClasesByTema(tema);

  if (clases.length === 0) notFound();

  const visitas = await trackTemaView(tema);
  const nombre = slugToNombre(tema);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
        {/* Boton Volver */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition-colors hover:bg-stone-50 hover:border-stone-300 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:border-stone-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
              clipRule="evenodd"
            />
          </svg>
          Volver
        </Link>

        {/* Encabezado del tema */}
        <header className="mt-10">
          <p className="text-sm font-medium uppercase tracking-widest text-amber-600 dark:text-amber-500">
            Tema
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
            {nombre}
          </h1>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            {clases.length} {clases.length === 1 ? "clase" : "clases"}
          </p>
          {visitas > 0 && (
            <p className="mt-1 text-sm text-stone-400 dark:text-stone-500">
              {visitas} {visitas === 1 ? "visita" : "visitas"}
            </p>
          )}
        </header>

        {/* Grid de clases */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clases.map((clase) => (
            <article
              key={clase.slug}
              className="group flex flex-col rounded-lg border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-stone-800 dark:bg-stone-900"
            >
              <time
                dateTime={clase.date}
                className="text-xs font-medium text-stone-500 dark:text-stone-500"
              >
                {formatDate(clase.date)}
              </time>
              <h3 className="mt-2 text-lg font-semibold text-stone-900 dark:text-stone-50 group-hover:text-amber-600 dark:group-hover:text-amber-500">
                {clase.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600 line-clamp-3 dark:text-stone-400">
                {truncateContent(clase.content)}
              </p>
              <Link
                href={`/clases/${clase.slug}`}
                className="mt-4 inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400"
                aria-label={`Ver clase: ${clase.title}`}
              >
                Ver clase &rarr;
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
