import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AudioLines, Loader2 } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { UploadCard } from "@/components/UploadCard";
import { AnalysisDashboard, type AnalysisData } from "@/components/AnalysisDashboard";
import { analyzeFile, downloadReport } from "@/lib/analyze";

export const Route = createFileRoute("/audio")({
  head: () => ({ meta: [{ title: "Audio Analysis — TrustLens AI" }] }),
  component: Page,
});

function Page() {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(false);
  const run = async (f: File) => { setLoading(true); setData(null); setData(await analyzeFile(f, "audio")); setLoading(false); };
  return (
    <AppLayout title="Audio Analysis">
      <div className="space-y-8">
        <section className="rounded-3xl glass-card p-6 md:p-8">
          <h3 className="text-base md:text-lg font-semibold mb-4">AI Voice & Clone Detection</h3>
          <div className="max-w-md">
            <UploadCard title="Upload Audio" formats="MP3 · WAV · AAC" icon={AudioLines} accept="audio/*" onFile={run} />
          </div>
        </section>
        {loading && <div className="rounded-2xl glass-card p-10 flex flex-col items-center"><Loader2 className="h-8 w-8 animate-spin mb-4" /><p className="text-sm text-muted-foreground">Analyzing spectral signatures…</p></div>}
        {data && <AnalysisDashboard data={data} onReport={() => downloadReport(data)} />}
      </div>
    </AppLayout>
  );
}
