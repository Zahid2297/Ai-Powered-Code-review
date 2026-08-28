"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { GitPullRequestIcon } from "@phosphor-icons/react";

import { statusBadge } from "@/features/dashboard/lib/status-style";
import type { DashboardPullRequest } from "@/features/pull-requests/server/get-pull-requests";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function getStatusTone(status: DashboardPullRequest["status"]) {
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

type PullRequestsListProps = {
  pullRequests: DashboardPullRequest[];
};

export function PullRequestsList({ pullRequests }: PullRequestsListProps) {
  if (pullRequests.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-12 text-center">
        <GitPullRequestIcon className="size-8 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">No pull requests yet</p>
          <p className="text-xs text-muted-foreground">
            Open or update a PR on a connected repository to see review history
            here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="rounded-none border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pull request</TableHead>
              <TableHead>Repository</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pullRequests.map((pullRequest) => (
              <TableRow key={pullRequest.id}>
                <TableCell>
                  <Link
                    href={`/dashboard/pull-requests/${pullRequest.id}`}
                    className="flex flex-col hover:underline"
                  >
                    <span className="font-medium">{pullRequest.title}</span>
                    <span className="text-xs text-muted-foreground">
                      #{pullRequest.prNumber}
                    </span>
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {pullRequest.repoFullName}
                </TableCell>
                <TableCell>
                  {pullRequest.authorLogin
                    ? `@${pullRequest.authorLogin}`
                    : "—"}
                </TableCell>
                <TableCell>
                  <span className={statusBadge(getStatusTone(pullRequest.status))}>
                    {pullRequest.status.replace("_", " ")}
                  </span>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {formatDistanceToNow(new Date(pullRequest.updatedAt), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
