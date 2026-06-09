import { useRef, useState, type DragEvent } from "react";
import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  formats: string;
  icon: LucideIcon;
  accept: string;
  onFile: (file: File) => void;
}

export function UploadCard({ title, formats, icon: Icon, accept, onFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  const handle = (f: File | undefined) => { if (f) onFile(f); };
  const onDrop = (e: DragEvent) => { e.preventDefault(); setOver(false); handle(e.dataTransfer.files?.[0]); };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      className={`group relative cursor-pointer rounded-2xl glass-card glass-card-hover p-6 flex flex-col items-center text-center transition-all ${over ? "glow-ring scale-[1.02]" : ""}`}
    >
      <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/0 border border-white/10 flex items-center justify-center mb-4 group-hover:animate-float">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-[11px] text-muted-foreground mt-1">{formats}</p>
      <button
        type="button"
        className="mt-4 text-xs rounded-full border border-white/15 px-4 py-1.5 bg-white/5 hover:bg-white/10 transition"
        onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
      >
        Browse file
      </button>
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={(e) => handle(e.target.files?.[0] ?? undefined)} />
    </div>
  );
}
