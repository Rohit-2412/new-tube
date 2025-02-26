"use client";

import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { VideoBanner } from "../components/video-banner";
import { VideoPlayer } from "../components/video-player";
import { VideoTopRow } from "../components/video-top-row";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";

interface VideoSectionProps {
  videoId: string;
}

export const VideoSection = ({ videoId }: VideoSectionProps) => {
  return (
    <Suspense fallback={<div> Loading... </div>}>
      <ErrorBoundary fallback={<div> Error </div>}>
        <VideoSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const VideoSectionSuspense = ({ videoId }: VideoSectionProps) => {
  const [video] = trpc.videos.getOne.useSuspenseQuery({ id: videoId });
  return (
    <>
      <div
        className={cn(
          "aspect-video bg-black rounded-xl overflow-hidden relative max-h-[calc(70vh-4rem)]",
          video.muxStatus !== "ready" && "rounded-b-none",
        )}
      >
        <VideoPlayer
          autoPlay={false}
          onPlay={() => {}}
          playbackId={video.muxPlaybackId}
          thumbnailUrl={video.thumbnailUrl}
        />
      </div>
      <VideoBanner status={video.muxStatus} />
      <VideoTopRow video={video} />
    </>
  );
};
