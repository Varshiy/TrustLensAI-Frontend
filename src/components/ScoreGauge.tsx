import { useEffect, useState } from "react";

interface Props { score: number; size?: number; label?: string; }

export function ScoreGauge({ score, size = 220, label = "TrustLens Score" }: Props) {
  const [animated, setAnimated] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setAnimated(score * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const radius = size / 2 - 14;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (animated / 100) * circ;

  const tone =
    score >= 90 ? { ring: "var(--success)", label: "Authentic", glow: "oklch(0.72 0.18 150 / 35%)" }
    : score >= 60 ? { ring: "var(--warning)", label: "Needs Review", glow: "oklch(0.82 0.16 85 / 35%)" }
    : { ring: "var(--destructive)", label: "Likely AI", glow: "oklch(0.62 0.21 25 / 35%)" };

  return (
    <div className="relative flex flex-col items-center" style={{ width: size }}>
      <div className="relative" style={{ width: size, height: size, filter: `drop-shadow(0 0 30px ${tone.glow})` }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size/2} cy={size/2} r={radius} stroke="oklch(1 0 0 / 8%)" strokeWidth={10} fill="none" />
          <circle
            cx={size/2} cy={size/2} r={radius}
            stroke={tone.ring} strokeWidth={10} fill="none"
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke 0.4s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-semibold tracking-tight tabular-nums">{Math.round(animated)}</span>
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">{label}</span>
        </div>
      </div>
      <div className="mt-4 inline-flex items-center gap-2 rounded-full glass-card px-3 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone.ring }} />
        <span className="text-xs font-medium">{tone.label}</span>
      </div>
    </div>
  );
}
