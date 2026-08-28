import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";

import { requireAuth } from "@/features/auth/actions";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { statusBadge } from "@/features/dashboard/lib/status-style";
import { AiReviewMarkdown } from "@/features/pull-requests/components/ai-review-markdown";
import { getPullRequestForUser } from "@/features/pull-requests/server/get-pull-requests";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PullRequestDetailPageProps = {
  params: Promise<{ id: string }>;
};

function getStatusTone(status: string) {
  switch (status) {
    case "reviewed":
      return "success" as const;
    case "processing":
      return "info" as const;
    case "rate_limited":
      return "warning" as const;
    default:
      return "neutral" as const;
  }
}

export async function generateMetadata({
  params,
}: PullRequestDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const session = await requireAuth();
  const pullRequest = await getPullRequestForUser(session.user.id, id);

  return {
    title: pullRequest
      ? `${pullRequest.title} · Pull Requests`
      : "Pull Request · Dashboard",
  };
}

export default async function PullRequestDetailPage({
  params,
}: PullRequestDetailPageProps) {
  const { id } = await params;
  const session = await requireAuth();
  const pullRequest = await getPullRequestForUser(session.user.id, id);

  if (!pullRequest) {
    notFound();
  }

  return (
    <>
      <DashboardHeader
        title={pullRequest.title}
        description={`${pullRequest.repoFullName} · #${pullRequest.prNumber}`}
      />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <Button
          variant="ghost"
          size="sm"
          className="w-fit"
          nativeButton={false}
          render={<Link href="/dashboard/pull-requests" />}
        >
          <ArrowLeftIcon />
          Back to pull requests
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground">Repository</p>
              <p className="font-medium">{pullRequest.repoFullName}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Author</p>
              <p className="font-medium">
                {pullRequest.authorLogin
                  ? `@${pullRequest.authorLogin}`
                  : "Unknown"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Base branch</p>
              <p className="font-medium">{pullRequest.baseBranch}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <span className={statusBadge(getStatusTone(pullRequest.status))}>
                {pullRequest.status.replace("_", " ")}
              </span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Last updated</p>
              <p className="font-medium">
                {formatDistanceToNow(new Date(pullRequest.updatedAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            {pullRequest.reviewedAt ? (
              <div>
                <p className="text-xs text-muted-foreground">Reviewed</p>
                <p className="font-medium">
                  {formatDistanceToNow(new Date(pullRequest.reviewedAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {pullRequest.reviewComment ? (
          <div className="space-y-3">
            <h2 className="text-sm font-medium">AI review</h2>
            <AiReviewMarkdown content={pullRequest.reviewComment} />
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-sm text-muted-foreground">
              {pullRequest.status === "processing"
                ? "AI review is in progress. Check back shortly."
                : "No AI review has been generated for this pull request yet."}
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
