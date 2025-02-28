"use client";

import {
  VideoGridCard,
  VideoGridCardSkeleton,
} from "../components/video-grid-card";
import {
  VideoRowCard,
  VideoRowCardSkeleton,
} from "../components/video-row-card";

import { DEFAULT_LIMIT } from "@/constants";
import { ErrorBoundary } from "react-error-boundary";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { Suspense } from "react";
import { trpc } from "@/trpc/client";

interface SuggestionsSectionProps {
  videoId: string;
  isManual?: boolean;
}

export const SuggestionsSection = ({
  videoId,
  isManual,
}: SuggestionsSectionProps) => {
  return (
    <Suspense fallback={<SuggestionsSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <SuggestionsSectionSuspense videoId={videoId} isManual={isManual} />
      </ErrorBoundary>
    </Suspense>
  );
};

const SuggestionsSectionSkeleton = () => {
  return (
    <>
      <div className="hidden md:block space-y-3">
        {Array.from({ length: 6 }).map((_, index) => {
          return <VideoRowCardSkeleton key={index} size="compact" />;
        })}
      </div>

      <div className="block md:hidden space-y-10">
        {Array.from({ length: 6 }).map((_, index) => {
          return <VideoGridCardSkeleton key={index} />;
        })}
      </div>
    </>
  );
};

const SuggestionsSectionSuspense = ({
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
