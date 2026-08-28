"use client";

import { Streamdown } from "streamdown";
import { cn } from "@/lib/utils";
import "streamdown/styles.css";

type AiReviewMarkdownProps = {
  content: string;
  className?: string;
};

export function AiReviewMarkdown({ content, className }: AiReviewMarkdownProps) {
  return (
    <div
      className={cn(
        "rounded-none border border-border bg-card p-4 text-sm text-card-foreground",
        className,
      )}
    >
      <Streamdown mode="static">{content}</Streamdown>
    </div>
  );
}
