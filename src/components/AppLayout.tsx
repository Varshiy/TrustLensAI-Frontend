import { ScanEye, Activity } from "lucide-react";
import { AppSidebar } from "./AppSidebar";
import type { ReactNode } from "react";

interface Props {
  title: string;
  eyebrow?: string;
  children: ReactNode;
}

export function AppLayout({ title, eyebrow = "Workspace", children }: Props) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 border-b border-border bg-background/70 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-4 md:px-6 py-3">
            <div className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 rounded-xl glass-card flex items-center justify-center glow-ring">
                <ScanEye className="h-4 w-4 text-foreground" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold tracking-tight text-gradient">TrustLens AI</span>
                <span className="hidden sm:block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{eyebrow} · {title}</span>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full glass-card px-3 py-1.5 text-[11px]">
                <Activity className="h-3 w-3" /> 12,438 assets verified today
              </span>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10" />
            </div>
          </div>
        </header>
        <div className="px-4 md:px-6 py-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
