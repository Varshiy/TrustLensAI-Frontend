import { CheckCircle2, ShieldCheck, AlertTriangle, XCircle, Download, FileText } from "lucide-react";
import { ScoreGauge } from "./ScoreGauge";
import { ProgressBar } from "./ProgressBar";

export interface AnalysisData {
  kind: "image" | "video" | "audio";
  fileName: string;
  previewUrl: string;
  score: number;
  confidence: number;
  metrics: { label: string; value: number; tone?: "good" | "warn" | "bad" | "neutral" }[];
  findings: string[];
}

export function AnalysisDashboard({ data, onReport }: { data: AnalysisData; onReport: () => void }) {
  const verdict =
    data.score >= 90 ? { icon: ShieldCheck, label: "Likely Authentic", tone: "text-success", chip: "bg-success/10 border-success/30" }
    : data.score >= 60 ? { icon: AlertTriangle, label: "Needs Review", tone: "text-warning", chip: "bg-warning/10 border-warning/30" }
    : { icon: XCircle, label: "AI Generated", tone: "text-destructive", chip: "bg-destructive/10 border-destructive/30" };

  const risk = data.score >= 90 ? "Low" : data.score >= 60 ? "Medium" : "High";
  const V = verdict.icon;

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Preview + Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Analyzed asset</p>
              <h3 className="text-base font-semibold mt-0.5 truncate max-w-md">{data.fileName}</h3>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground rounded-full border border-white/10 px-2.5 py-1">{data.kind}</span>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black flex items-center justify-center">
            {data.kind === "image" && <img src={data.previewUrl} alt={data.fileName} className="h-full w-full object-contain" />}
            {data.kind === "video" && <video src={data.previewUrl} controls className="h-full w-full object-contain" />}
            {data.kind === "audio" && (
              <div className="flex flex-col items-center gap-4 w-full px-8">
                <div className="flex items-end gap-1 h-24">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <span key={i} className="w-1.5 rounded-full bg-gradient-to-t from-white/20 to-white/80 animate-pulse"
                      style={{ height: `${20 + Math.sin(i * 0.6) * 35 + Math.random() * 30}%`, animationDelay: `${i * 40}ms` }} />
                  ))}
                </div>
                <audio src={data.previewUrl} controls className="w-full max-w-md" />
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl glass-card p-6 flex flex-col items-center justify-center">
          <ScoreGauge score={data.score} />
          <div className="grid grid-cols-2 gap-3 w-full mt-6">
            <div className="rounded-xl border border-white/10 p-3 text-center">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Confidence</p>
              <p className="text-lg font-semibold tabular-nums mt-0.5">{data.confidence}%</p>
            </div>
            <div className="rounded-xl border border-white/10 p-3 text-center">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Risk Level</p>
              <p className="text-lg font-semibold mt-0.5">{risk}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Verdict + Findings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`rounded-2xl glass-card p-6 border ${verdict.chip}`}>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Final verdict</p>
          <div className="flex items-center gap-3 mt-3">
            <V className={`h-8 w-8 ${verdict.tone}`} />
            <h3 className="text-2xl font-semibold">{verdict.label}</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Model confidence {data.confidence}% based on multi-signal forensic analysis.</p>
          <button
            onClick={onReport}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2.5 text-sm font-medium hover:opacity-90 transition w-full justify-center"
          >
            <Download className="h-4 w-4" /> Download PDF Report
          </button>
        </div>

        <div className="lg:col-span-2 rounded-2xl glass-card p-6">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Key findings</p>
          <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.findings.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-3 animate-fade-up" style={{ animationDelay: `${i*60}ms` }}>
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                <span className="text-sm">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Score breakdown */}
      <div className="rounded-2xl glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Score breakdown</p>
            <h3 className="text-base font-semibold mt-0.5">Detection signals</h3>
          </div>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {data.metrics.map((m) => (
            <ProgressBar key={m.label} label={m.label} value={m.value} tone={m.tone} />
          ))}
        </div>
      </div>
    </div>
  );
}
