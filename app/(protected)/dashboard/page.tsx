import type { Metadata } from "next";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  GitBranchIcon,
  GitPullRequestIcon,
  GithubLogo,
} from "@phosphor-icons/react/dist/ssr";

import { requireAuth } from "@/features/auth/actions";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";
import { statusBadge } from "@/features/dashboard/lib/status-style";
import { getOverview } from "@/features/overview/server/get-overview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Overview · Dashboard",
};

function getActivityTone(status: string) {
  switch (status) {
    case "reviewed":
    case "synced":
      return "success" as const;
    case "processing":
    case "syncing":
      return "info" as const;
    case "failed":
    case "rate_limited":
      return "warning" as const;
    default:
      return "neutral" as const;
  }
}

export default async function DashboardOverviewPage() {
  const session = await requireAuth();
  const overview = await getOverview(session.user.id);

  return (
    <>
      <DashboardHeader
        title="Overview"
        description="Installation status, repository sync summary, and recent activity."
      />
      <div className="flex flex-1 flex-col gap-6 p-6">
        {!overview.installation.connected ? (
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle className="text-base">Connect GitHub</CardTitle>
              <CardDescription>
                Install Just AI Reviewer on your GitHub account to start
                syncing repositories and reviewing pull requests.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                nativeButton={false}
                render={<Link href={DASHBOARD_ROUTES.github} />}
              >
                <GithubLogo />
                Go to GitHub App
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>GitHub account</CardDescription>
                  <CardTitle className="text-base">
                    @{overview.installation.accountLogin ?? "connected"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  Installed{" "}
                  {overview.installation.installedAt
                    ? formatDistanceToNow(
                        new Date(overview.installation.installedAt),
                        { addSuffix: true },
                      )
                    : "recently"}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Repositories</CardDescription>
                  <CardTitle className="text-base">
                    {overview.repoSummary?.totalRepos ?? 0}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  Available to the GitHub App installation
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Synced codebases</CardDescription>
                  <CardTitle className="text-base">
                    {overview.repoSummary?.syncedRepos ?? 0}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  {overview.repoSummary?.syncingRepos ?? 0} syncing ·{" "}
                  {overview.repoSummary?.pendingRepos ?? 0} pending ·{" "}
                  {overview.repoSummary?.failedRepos ?? 0} failed
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Recent reviews</CardDescription>
                  <CardTitle className="text-base">
                    {
                      overview.recentActivity.filter(
                        (item) => item.type === "pull_request",
                      ).length
                    }
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  Pull requests tracked in the last activity feed
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent activity</CardTitle>
                <CardDescription>
                  Latest pull request reviews and repository sync updates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {overview.recentActivity.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No activity yet. Sync a repository or open a pull request to
                    get started.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {overview.recentActivity.map((item) => {
                      const content = (
                        <div className="flex items-start justify-between gap-4 rounded-none border border-border p-3">
                          <div className="flex items-start gap-3">
                            {item.type === "pull_request" ? (
                              <GitPullRequestIcon className="mt-0.5 size-4 text-muted-foreground" />
                            ) : (
                              <GitBranchIcon className="mt-0.5 size-4 text-muted-foreground" />
                            )}
                            <div>
                              <p className="text-sm font-medium">{item.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className={statusBadge(getActivityTone(item.status))}>
                              {item.status.replace("_", " ")}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(item.timestamp), {
                                addSuffix: true,
                              })}
                            </span>
                          </div>
                        </div>
                      );

                      if (item.href) {
                        return (
                          <Link
                            key={item.id}
                            href={item.href}
                            className="block transition-colors hover:bg-muted/30"
                          >
                            {content}
                          </Link>
                        );
                      }

                      return <div key={item.id}>{content}</div>;
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </>
  );
}
