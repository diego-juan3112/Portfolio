// Escala VU: posición angular (grados desde la vertical) de cada marca. No es lineal, como en un medidor real.
const SCALE: [number, number][] = [
  [-20, -48],
  [-10, -34],
  [-7, -24],
  [-5, -15],
  [-3, -4],
  [-2, 2],
  [-1, 9],
  [0, 18],
  [1, 28],
  [2, 38],
  [3, 48],
];

const LABELED = new Set([-20, -10, -7, -5, -3, 0, 3]);
const PIVOT = { x: 100, y: 132 };
const RADIUS = 92;

/** Ángulo de la aguja para un valor VU, interpolando entre marcas. */
export function angleFor(vu: number): number {
  if (vu <= SCALE[0][0]) return SCALE[0][1];
  for (let i = 1; i < SCALE.length; i++) {
    const [v1, a1] = SCALE[i];
    const [v0, a0] = SCALE[i - 1];
    if (vu <= v1) return a0 + ((vu - v0) / (v1 - v0)) * (a1 - a0);
  }
  return SCALE.at(-1)![1];
}

// Redondeo a centésimas: Math.sin/Math.cos pueden diferir en el último decimal entre el motor JS del
// servidor (Node) y el del navegador, y eso rompe la hidratación de React. A esta escala 0.01 es invisible.
const round = (n: number) => Math.round(n * 100) / 100;

function point(angle: number, r: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: round(PIVOT.x + r * Math.sin(rad)), y: round(PIVOT.y - r * Math.cos(rad)) };
}

function arc(from: number, to: number, r: number) {
  const a = point(from, r);
  const b = point(to, r);
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${r} ${r} 0 0 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
}

/**
 * Cara de vúmetro. La aguja parte del tope izquierdo y gira hasta `vu` cuando un ancestro
 * recibe la clase `is-live` (ver globals.css); sin JS o con movimiento reducido ya está en su sitio.
 */
export function Meter({ vu, delay = 0 }: { vu: number; delay?: number }) {
  const zeroAngle = angleFor(0);
  return (
    <svg viewBox="0 0 200 140" className="meter" aria-hidden="true">
      <rect x="0" y="0" width="200" height="140" className="meter__face" />
      <path d={arc(-48, zeroAngle, RADIUS)} className="meter__arc" />
      <path d={arc(zeroAngle, 48, RADIUS)} className="meter__arc meter__arc--red" />
      {SCALE.map(([v, a]) => {
        const outer = point(a, RADIUS + 1);
        const inner = point(a, RADIUS - (LABELED.has(v) ? 9 : 5));
        const label = point(a, RADIUS + 12);
        return (
          <g key={v} className={v > 0 ? "meter__tick meter__tick--red" : "meter__tick"}>
            <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} />
            {LABELED.has(v) && (
              <text x={label.x} y={label.y} textAnchor="middle" dominantBaseline="middle">
                {v > 0 ? `+${v}` : v}
              </text>
            )}
          </g>
        );
      })}
      <text x="100" y="98" textAnchor="middle" className="meter__vu">
        VU
      </text>
      <g
        className="meter__needle"
        style={{ "--angle": `${angleFor(vu)}deg`, "--delay": `${delay}ms` } as React.CSSProperties}
      >
        <g className="meter__jitter">
          <line x1={PIVOT.x} y1={PIVOT.y} x2={PIVOT.x} y2={PIVOT.y - RADIUS + 4} />
        </g>
      </g>
      <rect x="0" y="118" width="200" height="22" className="meter__base" />
    </svg>
  );
}
