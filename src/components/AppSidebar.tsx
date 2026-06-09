import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Video,
  AudioLines,
  Globe,
  History,
  FileText,
  Settings,
  ScanEye,
} from "lucide-react";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Image Analysis", url: "/image", icon: ImageIcon },
  { title: "Video Analysis", url: "/video", icon: Video },
  { title: "Audio Analysis", url: "/audio", icon: AudioLines },
  { title: "Social Truth Check", url: "/social", icon: Globe },
  { title: "History", url: "/history", icon: History },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar h-screen sticky top-0">
      <div className="px-5 py-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="relative h-9 w-9 rounded-xl glass-card flex items-center justify-center glow-ring">
            <ScanEye className="h-5 w-5 text-foreground" />
            <span className="absolute inset-0 rounded-xl animate-pulse-glow pointer-events-none" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight text-gradient">TrustLens AI</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Detect · Verify · Trust</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
        <p className="px-3 pb-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Workspace</p>
        <ul className="space-y-1">
          {items.map((it) => {
            const active = pathname === it.url;
            return (
              <li key={it.url}>
                <Link
                  to={it.url}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/60 border border-transparent"
                  }`}
                >
                  <it.icon className={`h-4 w-4 ${active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`} />
                  <span>{it.title}</span>
                  {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-foreground animate-pulse" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="m-3 rounded-xl glass-card p-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-medium">Systems operational</span>
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">All detection engines online. v2.4.1</p>
      </div>
    </aside>
  );
}
