import { useEffect, useState } from "react";

export function ProgressBar({ label, value, tone = "neutral" }: { label: string; value: number; tone?: "neutral" | "good" | "warn" | "bad" }) {
  const [v, setV] = useState(0);
  useEffect(() => { const t = setTimeout(() => setV(value), 50); return () => clearTimeout(t); }, [value]);
  const color =
    tone === "good" ? "var(--success)"
    : tone === "warn" ? "var(--warning)"
    : tone === "bad" ? "var(--destructive)"
    : "oklch(0.85 0 0)";
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium tabular-nums">{value}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${v}%`, background: `linear-gradient(90deg, ${color}, oklch(1 0 0 / 60%))`, boxShadow: `0 0 12px ${color}` }}
        />
      </div>
    </div>
  );
}
