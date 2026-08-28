import type { Metadata } from "next";

import { LandingPage } from "@/features/landing/components/landing-page";

export const metadata: Metadata = {
  title: "Just AI Reviewer",
  description:
    "AI pull request reviews that understand your GitHub codebase. Install the app, sync a repo, and ship cleaner PRs.",
};

export default function Home() {
  return <LandingPage />;
}
