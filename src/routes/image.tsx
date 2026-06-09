import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { UploadCard } from "@/components/UploadCard";
import { AnalysisDashboard, type AnalysisData } from "@/components/AnalysisDashboard";
import { analyzeFile, downloadReport } from "@/lib/analyze";

export const Route = createFileRoute("/image")({
  head: () => ({ meta: [{ title: "Image Analysis — TrustLens AI" }] }),
  component: Page,
});

function Page() {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const run = async (f: File) => {
    setLoading(true); setData(null); setError(null);
    try {
      const result = await analyzeFile(f, "image");
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AppLayout title="Image Analysis">
      <div className="space-y-8">
        <section className="rounded-3xl glass-card p-6 md:p-8">
          <h3 className="text-base md:text-lg font-semibold mb-4">Deepfake & AI Image Detection</h3>
          <div className="max-w-md">
            <UploadCard title="Upload Image" formats="JPG · PNG · WEBP" icon={ImageIcon} accept="image/*" onFile={run} />
          </div>
        </section>
        {loading && (
          <div className="rounded-2xl glass-card p-10 flex flex-col items-center text-center">
            <Loader2 className="h-8 w-8 animate-spin mb-4" />
            <p className="text-sm text-muted-foreground">Sending image to TrustLens forensic backend…</p>
          </div>
        )}
        {error && !loading && (
          <div className="rounded-2xl glass-card border border-white/20 p-6 text-center">
            <h3 className="text-sm font-semibold">Backend unreachable</h3>
            <p className="text-sm text-muted-foreground mt-1">{error}. Ensure FastAPI is running at http://127.0.0.1:8000/predict.</p>
          </div>
        )}
        {data && <AnalysisDashboard data={data} onReport={() => downloadReport(data)} />}
      </div>
    </AppLayout>
  );
}
