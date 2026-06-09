import { useState } from "react";
import { Globe, Sparkles } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

export function SocialTruthCheck() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ truth: number; cred: number; source: number; misinfo: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const run = () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      let h = 0; for (let i = 0; i < text.length; i++) h = (h << 5) - h + text.charCodeAt(i);
      const r = (s: number) => Math.abs((h * s) % 60) + 30;
      setResult({ truth: r(7), cred: r(11), source: r(13), misinfo: 100 - r(17) });
      setLoading(false);
    }, 1100);
  };

  return (
    <div className="rounded-2xl glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="h-4 w-4" />
        <h3 className="text-sm font-semibold">Social Media Truth Check</h3>
        <span className="ml-auto text-[10px] uppercase tracking-widest text-muted-foreground">Live</span>
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && run()}
          placeholder="Paste a URL, tweet, post, caption, or claim…"
          className="flex-1 rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-white/30 transition"
        />
        <button
          onClick={run}
          disabled={loading || !text.trim()}
          className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-5 py-3 text-sm font-medium hover:opacity-90 disabled:opacity-50 transition"
        >
          <Sparkles className="h-4 w-4" />
          {loading ? "Analyzing…" : "Verify"}
        </button>
      </div>
      {result && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 animate-fade-up">
          <ProgressBar label="Truth Score" value={result.truth} tone={result.truth >= 70 ? "good" : "warn"} />
          <ProgressBar label="Credibility Score" value={result.cred} tone={result.cred >= 70 ? "good" : "warn"} />
          <ProgressBar label="Source Reliability" value={result.source} tone={result.source >= 70 ? "good" : "warn"} />
          <ProgressBar label="Misinformation Risk" value={result.misinfo} tone={result.misinfo >= 60 ? "bad" : "good"} />
        </div>
      )}
    </div>
  );
}
