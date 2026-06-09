import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Image as ImageIcon, Video, AudioLines, Loader2 } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { UploadCard } from "@/components/UploadCard";
import { AnalysisDashboard, type AnalysisData } from "@/components/AnalysisDashboard";
import { SocialTruthCheck } from "@/components/SocialTruthCheck";
import { HistoryList } from "@/components/HistoryList";
import { analyzeFile, downloadReport } from "@/lib/analyze";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TrustLens AI — Detect. Verify. Trust." },
      { name: "description", content: "TrustLens AI verifies images, video, audio and social claims with forensic AI detection — because what you see online isn't always reality." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handle = async (file: File, kind: "image" | "video" | "audio") => {
    setLoading(true);
    setData(null);
    setError(null);
    try {
      const result = await analyzeFile(file, kind);
      setData(result);
      requestAnimationFrame(() => document.getElementById("analysis")?.scrollIntoView({ behavior: "smooth" }));
    } catch (e) {
      setError(
        e instanceof Error
          ? `${e.message}. Ensure the FastAPI backend is running at http://127.0.0.1:8000/predict.`
          : "Analysis failed. Ensure the backend is reachable.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout title="Forensic Dashboard">
      <div className="space-y-10">
        <section className="text-center max-w-2xl mx-auto animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full glass-card px-3 py-1.5 text-[11px] mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            Forensic engine online
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gradient">Detect. Verify. Trust.</h2>
          <p className="mt-3 text-sm md:text-base text-muted-foreground">
            Because what you see on the internet isn't always reality. Upload any asset to run multi-signal authenticity analysis.
          </p>
        </section>

        <section className="rounded-3xl glass-card p-6 md:p-8 animate-fade-up" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Upload</p>
              <h3 className="text-base md:text-lg font-semibold mt-0.5">Drop any file to verify authenticity</h3>
            </div>
            <span className="hidden md:inline text-[11px] text-muted-foreground">Max 200MB · Encrypted in transit</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <UploadCard title="Upload Image" formats="JPG · PNG · JPEG · WEBP" icon={ImageIcon} accept="image/*" onFile={(f) => handle(f, "image")} />
            <UploadCard title="Upload Video" formats="MP4 · MOV · AVI · MKV" icon={Video} accept="video/*" onFile={(f) => handle(f, "video")} />
            <UploadCard title="Upload Audio" formats="MP3 · WAV · AAC · M4A" icon={AudioLines} accept="audio/*" onFile={(f) => handle(f, "audio")} />
          </div>
        </section>

        {loading && (
          <section className="rounded-2xl glass-card p-10 flex flex-col items-center text-center animate-fade-up">
            <Loader2 className="h-8 w-8 animate-spin mb-4" />
            <h3 className="text-base font-semibold">Running forensic analysis</h3>
            <p className="text-sm text-muted-foreground mt-1">Decoding pixels, metadata, frequency signatures, and synthesis fingerprints…</p>
            <div className="mt-6 w-full max-w-md h-1 rounded-full bg-muted overflow-hidden relative">
              <div className="absolute inset-0 animate-shimmer" />
            </div>
          </section>
        )}

        {error && !loading && (
          <section className="rounded-2xl glass-card border border-white/20 p-6 text-center animate-fade-up">
            <h3 className="text-sm font-semibold">Backend unreachable</h3>
            <p className="text-sm text-muted-foreground mt-1">{error}</p>
          </section>
        )}

        {data && (
          <section id="analysis">
            <AnalysisDashboard data={data} onReport={() => downloadReport(data)} />
          </section>
        )}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SocialTruthCheck />
          <HistoryList />
        </section>

        <footer className="text-center text-[11px] text-muted-foreground pt-4 pb-2">
          © 2026 TrustLens AI · Forensic intelligence for the post-truth web
        </footer>
      </div>
    </AppLayout>
  );
}
