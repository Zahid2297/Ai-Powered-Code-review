import { getUserInstallationId } from "@/features/github/server/installation";
import { prisma } from "@/lib/db";

export type PullRequestStatus =
  | "pending"
  | "processing"
  | "reviewed"
  | "rate_limited";

export type DashboardPullRequest = {
  id: string;
  repoFullName: string;
  prNumber: number;
  title: string;
  authorLogin: string | null;
  baseBranch: string;
  status: PullRequestStatus;
  reviewComment: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DashboardPullRequestDetail = DashboardPullRequest & {
  headSha: string;
};

function mapPullRequest(
  pullRequest: {
    id: string;
    repoFullName: string;
    prNumber: number;
    title: string;
    authorLogin: string | null;
    baseBranch: string;
    status: string;
    reviewComment: string | null;
    reviewedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    headSha?: string;
  },
): DashboardPullRequest {
  return {
    id: pullRequest.id,
    repoFullName: pullRequest.repoFullName,
    prNumber: pullRequest.prNumber,
    title: pullRequest.title,
    authorLogin: pullRequest.authorLogin,
    baseBranch: pullRequest.baseBranch,
    status: pullRequest.status as PullRequestStatus,
    reviewComment: pullRequest.reviewComment,
    reviewedAt: pullRequest.reviewedAt?.toISOString() ?? null,
    createdAt: pullRequest.createdAt.toISOString(),
    updatedAt: pullRequest.updatedAt.toISOString(),
  };
}

async function getInstallationIdForUser(userId: string) {
  return getUserInstallationId(userId);
}

export async function getPullRequestsForUser(userId: string) {
  const installationId = await getInstallationIdForUser(userId);

  if (!installationId) {
    return [];
  }

  const pullRequests = await prisma.pullRequest.findMany({
    where: { installationId },
    orderBy: { updatedAt: "desc" },
  });

  return pullRequests.map(mapPullRequest);
}

export async function getPullRequestForUser(userId: string, pullRequestId: string) {
  const installationId = await getInstallationIdForUser(userId);

  if (!installationId) {
    return null;
  }

  const pullRequest = await prisma.pullRequest.findFirst({
    where: {
      id: pullRequestId,
      installationId,
    },
  });

  if (!pullRequest) {
    return null;
  }

  return {
    ...mapPullRequest(pullRequest),
    headSha: pullRequest.headSha,
  } satisfies DashboardPullRequestDetail;
}
