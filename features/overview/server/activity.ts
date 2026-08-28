import { prisma } from "@/lib/db";

export type ActivityItem = {
  id: string;
  type: "pull_request" | "repo_sync";
  title: string;
  description: string;
  status: string;
  timestamp: string;
  href: string | null;
};

export async function getRecentActivity(
  installationId: number,
  limit = 8,
): Promise<ActivityItem[]> {
  const [pullRequests, repoSyncs] = await Promise.all([
    prisma.pullRequest.findMany({
      where: { installationId },
      orderBy: { updatedAt: "desc" },
      take: limit,
      select: {
        id: true,
        title: true,
        repoFullName: true,
        prNumber: true,
        status: true,
        updatedAt: true,
      },
    }),
    prisma.repoSync.findMany({
      where: { installationId },
      orderBy: { updatedAt: "desc" },
      take: limit,
      select: {
        id: true,
        repoFullName: true,
        branch: true,
        status: true,
        updatedAt: true,
      },
    }),
  ]);

  const activity: ActivityItem[] = [
    ...pullRequests.map((pullRequest) => ({
      id: pullRequest.id,
      type: "pull_request" as const,
      title: pullRequest.title,
      description: `${pullRequest.repoFullName} · #${pullRequest.prNumber}`,
      status: pullRequest.status,
      timestamp: pullRequest.updatedAt.toISOString(),
      href: `/dashboard/pull-requests/${pullRequest.id}`,
    })),
    ...repoSyncs.map((repoSync) => ({
      id: repoSync.id,
      type: "repo_sync" as const,
      title: repoSync.repoFullName,
      description: `Branch ${repoSync.branch}`,
      status: repoSync.status,
      timestamp: repoSync.updatedAt.toISOString(),
      href: "/dashboard/repos",
    })),
  ];

  return activity
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )
    .slice(0, limit);
}
