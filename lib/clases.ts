import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";

const CLASES_DIR = join(process.cwd(), "content", "clases");

export interface ClaseFrontmatter {
  title: string;
  date: string;
  tema: string;
  [key: string]: unknown;
}

export interface Clase {
  slug: string;
  title: string;
  date: string;
  tema: string;
  content: string;
}

export interface Tema {
  slug: string;
  nombre: string;
  cantidadClases: number;
  ultimaFecha: string;
}

/**
 * Convierte un slug de tema a un nombre legible.
 * Ejemplo: "gestion-agil" -> "Gestion Agil"
 */
function slugToNombre(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Lee la carpeta content/clases, extrae titulo, fecha, tema y contenido
 * de cada archivo .md usando gray-matter.
 * Solo funciona en el servidor (Node.js runtime).
 */
export async function getClases(): Promise<Clase[]> {
  let files: string[];
  try {
    files = await readdir(CLASES_DIR);
  } catch {
    return [];
  }
  const mdFiles = files.filter((file) => file.endsWith(".md"));

  const clases = await Promise.all(
    mdFiles.map(async (filename) => {
      const filePath = join(CLASES_DIR, filename);
      const fileContent = await readFile(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      const slug = filename.replace(/\.md$/, "");
      const title = (data.title as string) ?? slug;
      const date = (data.date as string) ?? "";
      const tema = (data.tema as string) ?? "sin-tema";

      return {
        slug,
        title,
        date,
        tema,
        content,
      };
    })
  );

  // Ordenar por fecha descendente (mas recientes primero)
  return clases.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Obtiene una clase por su slug.
 */
export async function getClaseBySlug(slug: string): Promise<Clase | null> {
  const clases = await getClases();
  return clases.find((c) => c.slug === slug) ?? null;
}

/**
 * Obtiene las clases filtradas por tema.
 */
export async function getClasesByTema(tema: string): Promise<Clase[]> {
  const clases = await getClases();
  return clases.filter((c) => c.tema === tema);
}

/**
 * Obtiene la lista de temas unicos con su metadata.
 * Se detectan automaticamente desde el frontmatter de los archivos .md.
 */
export async function getTemas(): Promise<Tema[]> {
  const clases = await getClases();

  const temasMap = new Map<string, { fechas: string[]; count: number }>();

  for (const clase of clases) {
    const existing = temasMap.get(clase.tema);
    if (existing) {
      existing.count++;
      existing.fechas.push(clase.date);
    } else {
      temasMap.set(clase.tema, { fechas: [clase.date], count: 1 });
    }
  }

  const temas: Tema[] = [];
  for (const [slug, data] of temasMap) {
    const ultimaFecha = data.fechas.sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    )[0];

    temas.push({
      slug,
      nombre: slugToNombre(slug),
      cantidadClases: data.count,
      ultimaFecha: ultimaFecha ?? "",
    });
  }

  // Ordenar temas por fecha de ultima clase (mas recientes primero)
  return temas.sort(
    (a, b) =>
      new Date(b.ultimaFecha).getTime() - new Date(a.ultimaFecha).getTime()
  );
}
