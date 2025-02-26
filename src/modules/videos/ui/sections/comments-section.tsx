"use client";

import { CommentForm } from "@/modules/comments/ui/components/comment-form";
import { CommentItem } from "@/modules/comments/ui/components/comment-item";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { trpc } from "@/trpc/client";

interface CommentsSectionProps {
  videoId: string;
}

export const CommentsSection = ({ videoId }: CommentsSectionProps) => {
  return (
    <Suspense fallback={<div>Loading comments...</div>}>
      <ErrorBoundary fallback={<div>Failed to load comments</div>}>
        <CommentsSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const CommentsSectionSuspense = ({ videoId }: CommentsSectionProps) => {
  const [comments] = trpc.comments.getMany.useSuspenseQuery({ videoId });

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-6">
        <h1>{comments.length} comments</h1>
        <CommentForm videoId={videoId} />
      </div>
      <div className="flex flex-col gap-4 mt-2">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
