import type { Metadata } from "next";
import Link from "next/link";

import { requireAuth } from "@/features/auth/actions";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";
import { getInstallationStatus } from "@/features/github/server/installation";
import { PullRequestsList } from "@/features/pull-requests/components/pull-requests-list";
import { getPullRequestsForUser } from "@/features/pull-requests/server/get-pull-requests";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pull Requests · Dashboard",
};

function PullRequestsNotConnected() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
      <p className="text-sm text-muted-foreground">
        Install the GitHub App first to track pull request reviews.
      </p>
      <Button
        nativeButton={false}
        render={<Link href={DASHBOARD_ROUTES.github} />}
      >
        Go to GitHub App
      </Button>
    </div>
  );
}

export default async function DashboardPullRequestsPage() {
  const session = await requireAuth();
  const installation = await getInstallationStatus(session.user.id);

  const header = (
    <DashboardHeader
      title="Pull Requests"
      description="Review history and AI-generated feedback for your repositories."
    />
  );

  if (!installation.connected) {
    return (
      <>
        {header}
        <PullRequestsNotConnected />
      </>
    );
  }

  const pullRequests = await getPullRequestsForUser(session.user.id);

  return (
    <>
      {header}
      <PullRequestsList pullRequests={pullRequests} />
    </>
  );
}
