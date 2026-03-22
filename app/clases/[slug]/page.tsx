import Link from "next/link";
import { notFound } from "next/navigation";
import type { HTMLAttributes, ImgHTMLAttributes } from "react";
import { getClaseBySlug, getClases } from "@/lib/clases";
import { BASE_PATH } from "@/lib/basePath";
import { trackClaseView } from "@/app/actions/pageviews";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const clases = await getClases();
  return clases.map((clase) => ({ slug: clase.slug }));
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

export default async function ClasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const clase = await getClaseBySlug(slug);

  if (!clase) notFound();

  const visitas = await trackClaseView(slug);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 sm:py-16">
        {/* Botón Volver */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition-colors hover:bg-stone-50 hover:border-stone-300 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:border-stone-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
              clipRule="evenodd"
            />
          </svg>
          Volver
        </Link>

        {/* Encabezado del artículo */}
        <header className="mt-10">
          <time
            dateTime={clase.date}
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            {formatDate(clase.date)}
          </time>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
            {clase.title}
          </h1>
          {visitas > 0 && (
            <p className="mt-1 text-sm text-stone-400 dark:text-stone-500">
              {visitas} {visitas === 1 ? "visita" : "visitas"}
            </p>
          )}
        </header>

        {/* Contenido Markdown con tipografía para lectura larga */}
        <article className="clase-prose mt-10">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSlug]}
          components={{
            ul: (props) => (
              <ul
                className="list-disc list-inside my-4 pl-2 [&>li]:my-1"
                {...(props as HTMLAttributes<HTMLUListElement>)}
              />
            ),
            ol: (props) => (
              <ol
                className="list-decimal list-inside my-4 pl-2 [&>li]:my-1"
                {...(props as HTMLAttributes<HTMLOListElement>)}
              />
            ),
            img: (props) => {
              const { src, alt, ...rest } = props as ImgHTMLAttributes<HTMLImageElement>;
              const resolved =
                typeof src === "string" && src.startsWith("/")
                  ? `${BASE_PATH}${src}`
                  : src;
              return <img src={resolved} alt={alt ?? ""} {...rest} />;
            },
          }}
        >
          {clase.content}
        </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
