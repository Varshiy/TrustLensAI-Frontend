import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — TrustLens AI" }] }),
  component: () => (
    <AppLayout title="Settings">
      <div className="rounded-2xl glass-card p-8 space-y-4 max-w-2xl">
        <div className="flex items-center gap-3">
          <SettingsIcon className="h-5 w-5" />
          <h3 className="text-base font-semibold">Workspace Settings</h3>
        </div>
        <div className="grid gap-3 text-sm">
          <div className="flex justify-between border-b border-white/5 py-3"><span className="text-muted-foreground">Detection sensitivity</span><span>Balanced</span></div>
          <div className="flex justify-between border-b border-white/5 py-3"><span className="text-muted-foreground">Auto-generate reports</span><span>Enabled</span></div>
          <div className="flex justify-between border-b border-white/5 py-3"><span className="text-muted-foreground">Engine version</span><span>v2.4.1</span></div>
        </div>
      </div>
    </AppLayout>
  ),
});
