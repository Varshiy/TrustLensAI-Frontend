import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { SocialTruthCheck } from "@/components/SocialTruthCheck";

export const Route = createFileRoute("/social")({
  head: () => ({ meta: [{ title: "Social Truth Check — TrustLens AI" }] }),
  component: () => <AppLayout title="Social Truth Check"><SocialTruthCheck /></AppLayout>,
});
