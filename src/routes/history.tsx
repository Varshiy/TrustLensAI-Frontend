import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { HistoryList } from "@/components/HistoryList";

export const Route = createFileRoute("/history")({
  head: () => ({ meta: [{ title: "History — TrustLens AI" }] }),
  component: () => <AppLayout title="History"><HistoryList /></AppLayout>,
});
