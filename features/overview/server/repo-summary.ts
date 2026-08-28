import { getInstallationReposPage } from "@/features/github/server/repos";
import { prisma } from "@/lib/db";

export type RepoSummary = {
  totalRepos: number;
  syncedRepos: number;
  syncingRepos: number;
  pendingRepos: number;
  failedRepos: number;
};

export async function getRepoSummary(installationId: number): Promise<RepoSummary> {
  const [{ totalCount }, syncRecords] = await Promise.all([
    getInstallationReposPage(installationId, 1),
    prisma.repoSync.findMany({
      where: { installationId },
      select: { status: true },
    }),
  ]);

  const counts = {
    syncedRepos: 0,
    syncingRepos: 0,
    pendingRepos: 0,
    failedRepos: 0,
  };

  for (const record of syncRecords) {
    switch (record.status) {
      case "synced":
        counts.syncedRepos += 1;
        break;
      case "syncing":
        counts.syncingRepos += 1;
        break;
      case "failed":
        counts.failedRepos += 1;
        break;
      default:
        counts.pendingRepos += 1;
        break;
    }
  }

  return {
    totalRepos: totalCount,
    ...counts,
  };
}
