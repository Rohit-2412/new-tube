"use client";

import { DEFAULT_LIMIT } from "@/constants";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { VideoGridCard } from "../components/video-grid-card";
import { VideoRowCard } from "../components/video-row-card";
import { trpc } from "@/trpc/client";

interface SuggestionsSectionProps {
  videoId: string;
  isManual?: boolean;
}

export const SuggestionsSection = ({
  videoId,
  isManual,
}: SuggestionsSectionProps) => {
  const [suggestions, query] =
    trpc.suggestions.getMany.useSuspenseInfiniteQuery(
      {
        videoId,
        limit: DEFAULT_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );
  return (
    <>
      <div className="hidden md:block space-y-3">
        {suggestions.pages
          .flatMap((page) => page.items)
          .map((suggestion) => {
            return (
              <VideoRowCard
                key={suggestion.id}
                data={suggestion}
                size="compact"
              />
            );
          })}
      </div>

      <div className="block md:hidden space-y-10">
        {suggestions.pages
          .flatMap((page) => page.items)
          .map((suggestion) => {
            return <VideoGridCard key={suggestion.id} data={suggestion} />;
          })}
      </div>

      <InfiniteScroll
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
        isManual={isManual}
      />
    </>
  );
};
