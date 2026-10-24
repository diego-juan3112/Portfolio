import type { Locale } from "@/i18n/config";

// Fragmentos de interfaz de cada proyecto, dibujados en HTML en lugar de capturas.
// Los valores numéricos son de ejemplo y se rotulan como tales en pantalla.

function SampleTag({ text }: { text: string }) {
  return <p className="mt-3 text-base text-on-desk-soft">{text}</p>;
}

function KogniaFragment({ lang, sample }: { lang: Locale; sample: string }) {
  const es = lang === "es";
  return (
    <figure data-ui className="m-0">
      <div className="bg-[#0e0d0b] p-5 text-on-desk">
        <p className="font-cond text-lg font-semibold">{es ? "API en vivo" : "Live API"}</p>
        <p className="mt-3 text-base">
          {es ? "«¿Cuántas IPS públicas hay en Antioquia?»" : "“How many public health providers are in Antioquia?”"}
        </p>
        <pre className="mt-4 overflow-x-auto bg-desk-2 p-4 text-base leading-relaxed text-on-desk">
          <code>{`SELECT count(DISTINCT c_digo_prestador)
WHERE departamento = 'Antioquia'
  AND naturaleza = 'Pública'`}</code>
        </pre>
        <dl className="mt-4 grid grid-cols-3 gap-3 text-base">
          <div>
            <dt className="text-on-desk-soft">{es ? "Fuente" : "Source"}</dt>
            <dd>datos.gov.co · REPS</dd>
          </div>
          <div>
            <dt className="text-on-desk-soft">{es ? "Corte" : "Cut-off"}</dt>
            <dd>2022</dd>
          </div>
          <div>
            <dt className="text-on-desk-soft">{es ? "Respuesta" : "Response"}</dt>
            <dd>1 {es ? "fila" : "row"} · 412 ms</dd>
          </div>
        </dl>
      </div>
      <SampleTag text={sample} />
    </figure>
  );
}

function AlertaFragment({ lang, sample }: { lang: Locale; sample: string }) {
  const es = lang === "es";
  return (
    <figure data-ui className="m-0">
      <div className="grid gap-4 sm:grid-cols-[1fr_0.9fr]">
        <pre className="overflow-x-auto bg-[#0e0d0b] p-4 text-base leading-relaxed text-on-desk">
          <code>{`GET /zonas-riesgo
{
  "localidad": "Kennedy",
  "riesgo": "alto",
  "cluster": 2,
  "anomalia_z": 2.4
}`}</code>
        </pre>
        <div className="flex flex-col justify-center bg-face p-4 text-ink">
          <p className="font-cond text-lg font-bold">Alerta Ciudadana</p>
          <p className="mt-1 text-base">
            {es
              ? "Entraste a una zona de riesgo alto: Kennedy. Mantente atento."
              : "You entered a high-risk zone: Kennedy. Stay alert."}
          </p>
          <p className="mt-2 text-base font-semibold text-red">{es ? "Notificación local · GPS" : "Local notification · GPS"}</p>
        </div>
      </div>
      <SampleTag text={sample} />
    </figure>
  );
}

// Tablero de Tactical Grid: un camino encontrado por búsqueda informada entre dos unidades
const BOARD = [
  "A·······",
  "*···##··",
  "*··##···",
  "****#···",
  "···*#·##",
  "···*****",
  "·##····*",
  "·······B",
];

const CELL_STYLE: Record<string, string> = {
  "#": "bg-desk-3",
  "*": "bg-red",
  "·": "bg-face-2",
  unit: "bg-face text-ink",
};

function TacticalFragment({ lang }: { lang: Locale }) {
  const es = lang === "es";
  return (
    <figure data-ui className="m-0">
      <div
        className="grid aspect-square max-w-sm grid-cols-8 gap-[3px] bg-[#0e0d0b] p-[3px]"
        role="img"
        aria-label={
          es
            ? "Tablero de 8 por 8 con un camino de la unidad A a la unidad B que esquiva los muros"
            : "8 by 8 board with a path from unit A to unit B that avoids the walls"
        }
      >
        {BOARD.flatMap((row, y) =>
          row.split("").map((cell, x) => (
            <span
              key={`${x}-${y}`}
              className={`flex items-center justify-center font-cond text-lg font-bold ${CELL_STYLE[cell] ?? CELL_STYLE.unit}`}
            >
              {cell === "A" || cell === "B" ? cell : ""}
            </span>
          )),
        )}
      </div>
      <figcaption className="mt-3 text-base text-on-desk-soft">
        {es ? "Camino de A a B por búsqueda informada; los muros en gris." : "Path from A to B by informed search; walls in grey."}
      </figcaption>
    </figure>
  );
}

function CuadernilloFragment({ lang, sample }: { lang: Locale; sample: string }) {
  const es = lang === "es";
  const options = es
    ? ["Una inferencia del texto", "Un dato explícito", "Una opinión del autor", "Una conclusión falsa"]
    : ["An inference from the text", "An explicit fact", "The author's opinion", "A false conclusion"];
  return (
    <figure data-ui className="m-0">
      <div className="bg-face p-5 text-ink">
        <p className="font-cond text-lg font-bold">{es ? "Pregunta de lectura crítica" : "Critical reading question"}</p>
        <p className="mt-2 text-base">
          {es
            ? "Según el párrafo anterior, la afirmación «el agua es un recurso limitado» corresponde a:"
            : "According to the previous paragraph, the statement “water is a limited resource” is:"}
        </p>
        <ul className="mt-3 space-y-1 text-base">
          {options.map((o, i) => (
            <li key={o} className={i === 1 ? "font-semibold" : undefined}>
              {"ABCD"[i]}. {o}
            </li>
          ))}
        </ul>
      </div>
      <SampleTag text={sample} />
    </figure>
  );
}

export function ProjectFragment({ slug, lang, sample }: { slug: string; lang: Locale; sample: string }) {
  switch (slug) {
    case "kognia-voice-agent":
      return <KogniaFragment lang={lang} sample={sample} />;
    case "alerta-ciudadana":
      return <AlertaFragment lang={lang} sample={sample} />;
    case "tactical-grid":
      return <TacticalFragment lang={lang} />;
    case "san-jose-cuadernillos":
      return <CuadernilloFragment lang={lang} sample={sample} />;
    default:
      return null;
  }
}
