import { getClases, getTemas } from "@/lib/clases";
import SearchBar from "@/app/components/SearchBar";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function Home() {
  const [temas, clases] = await Promise.all([getTemas(), getClases()]);

  const claseResults = clases.map((c) => ({
    slug: c.slug,
    title: c.title,
    temaSlug: c.tema,
    tema: c.tema
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
  }));

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Hero / Profile */}
      <header className="border-b border-stone-200 dark:border-stone-800">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <p className="text-sm font-medium uppercase tracking-widest text-amber-600 dark:text-amber-500">
            Notas
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
            Informática: proyectos, analítica y desarrollo.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-400">
            Material de clases, apuntes y recursos para estudiantes (y no estudiantes).
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-600 dark:text-stone-400 italic">
            La paciencia es la compañía de la sabiduría - S. Agustín de Hipona.
          </p>
        </div>
      </header>

      {/* Buscador */}
      <div className="border-b border-stone-200 dark:border-stone-800">
        <SearchBar
          clases={claseResults}
          temas={temas.map((t) => ({ slug: t.slug, nombre: t.nombre }))}
        />
      </div>

      {/* Temas grid */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <h2 className="text-sm font-medium uppercase tracking-widest text-stone-500 dark:text-stone-500">
          Temas
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {temas.length === 0 ? (
            <p className="col-span-full text-stone-500 dark:text-stone-400">
              No hay temas publicados aun.
            </p>
          ) : (
            temas.map((tema) => (
              <a
                key={tema.slug}
                href={`/temas/${tema.slug}`}
                className="group flex flex-col rounded-lg border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-stone-800 dark:bg-stone-900"
              >
                <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50 group-hover:text-amber-600 dark:group-hover:text-amber-500">
                  {tema.nombre}
                </h3>
                <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                  {tema.cantidadClases}{" "}
                  {tema.cantidadClases === 1 ? "clase" : "clases"}
                </p>
                {tema.ultimaFecha && (
                  <time
                    dateTime={tema.ultimaFecha}
                    className="mt-auto pt-4 text-xs text-stone-400 dark:text-stone-500"
                  >
                    Ultima actualizacion: {formatDate(tema.ultimaFecha)}
                  </time>
                )}
                <span className="mt-3 inline-flex items-center text-sm font-medium text-amber-600 group-hover:text-amber-700 dark:text-amber-500 dark:group-hover:text-amber-400">
                  Ver clases &rarr;
                </span>
              </a>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
