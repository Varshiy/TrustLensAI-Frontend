import { Image as ImageIcon, Video, AudioLines, ChevronRight } from "lucide-react";

const items = [
  { name: "press_release_video.mp4", kind: "video", score: 42, date: "2m ago" },
  { name: "ceo_statement.mp3", kind: "audio", score: 87, date: "1h ago" },
  { name: "leaked_photo.jpg", kind: "image", score: 96, date: "3h ago" },
  { name: "product_demo.mp4", kind: "video", score: 78, date: "Yesterday" },
  { name: "voice_note_lia.wav", kind: "audio", score: 31, date: "2d ago" },
];

const icon = { image: ImageIcon, video: Video, audio: AudioLines } as const;

export function HistoryList() {
  return (
    <div className="rounded-2xl glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Recent</p>
          <h3 className="text-base font-semibold mt-0.5">Analysis History</h3>
        </div>
        <button className="text-xs text-muted-foreground hover:text-foreground transition">View all</button>
      </div>
      <ul className="divide-y divide-white/5">
        {items.map((it) => {
          const Icon = icon[it.kind as keyof typeof icon];
          const tone = it.score >= 90 ? "text-success" : it.score >= 60 ? "text-warning" : "text-destructive";
          return (
            <li key={it.name} className="flex items-center gap-3 py-3 group cursor-pointer">
              <div className="h-9 w-9 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center">
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{it.name}</p>
                <p className="text-[11px] text-muted-foreground">{it.date} · {it.kind}</p>
              </div>
              <span className={`text-sm font-semibold tabular-nums ${tone}`}>{it.score}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
