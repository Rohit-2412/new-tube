import { CornerDownRightIcon, Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CommentItem } from "./comment-item";
import { DEFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";

interface CommentRepliesProps {
  videoId: string;
  parentId: string;
}

export const CommentReplies = ({ videoId, parentId }: CommentRepliesProps) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.comments.getMany.useInfiniteQuery(
      {
        videoId,
        parentId,
        limit: DEFAULT_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );
  return (
    <div className="pl-14 ">
      <div className="flex flex-col gap-4 mt-2">
        {isLoading && (
          <div className="flex items-center justify-center">
            <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {!isLoading &&
          data?.pages
            .flatMap((page) => page.items)
            .map((comment) => (
              <CommentItem key={comment.id} comment={comment} variant="reply" />
            ))}
      </div>

      {hasNextPage && (
        <Button
          variant={"tertiary"}
          size={"sm"}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <>
              <CornerDownRightIcon className="size-4" /> Shore more replies
            </>
          )}
        </Button>
      )}
    </div>
  );
};
