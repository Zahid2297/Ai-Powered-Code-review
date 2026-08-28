import type { GithubInstallationStatus } from "@/features/dashboard/lib/types";
import {
  getInstallationStatus,
  getUserInstallationId,
} from "@/features/github/server/installation";
import { getRecentActivity, type ActivityItem } from "./activity";
import { getRepoSummary, type RepoSummary } from "./repo-summary";

export type OverviewData = {
  installation: GithubInstallationStatus;
  repoSummary: RepoSummary | null;
  recentActivity: ActivityItem[];
};

const emptyRepoSummary: RepoSummary = {
  totalRepos: 0,
  syncedRepos: 0,
  syncingRepos: 0,
  pendingRepos: 0,
  failedRepos: 0,
};

export async function getOverview(userId: string): Promise<OverviewData> {
  const installation = await getInstallationStatus(userId);

  if (!installation.connected) {
    return {
      installation,
      repoSummary: null,
      recentActivity: [],
    };
  }

  const installationId = await getUserInstallationId(userId);

  if (!installationId) {
    return {
      installation,
      repoSummary: emptyRepoSummary,
      recentActivity: [],
    };
  }

  const [repoSummary, recentActivity] = await Promise.all([
    getRepoSummary(installationId),
    getRecentActivity(installationId),
  ]);

  return {
    installation,
    repoSummary,
    recentActivity,
  };
}
