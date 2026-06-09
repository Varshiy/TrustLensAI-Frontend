import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — TrustLens AI" }] }),
  component: () => (
    <AppLayout title="Reports">
      <div className="rounded-2xl glass-card p-10 text-center">
        <FileText className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-base font-semibold">No reports yet</h3>
        <p className="text-sm text-muted-foreground mt-1">Run an analysis to generate forensic reports here.</p>
      </div>
    </AppLayout>
  ),
});
