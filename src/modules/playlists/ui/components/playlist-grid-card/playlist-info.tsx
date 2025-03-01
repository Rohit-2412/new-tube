import { PlaylistGetManyOutputs } from "@/modules/playlists/types";
import { Skeleton } from "@/components/ui/skeleton";

interface PlaylistInfoProps {
  data: PlaylistGetManyOutputs["items"][number];
}

export const PlaylistInfoSkeleton = () => {
  return (
    <div className="flex gap-3">
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="w-[90%] h-5" />
        <Skeleton className="w-[79%] h-5" />
        <Skeleton className="w-[50%] h-5" />
      </div>
    </div>
  );
};

export const PlaylistInfo = ({ data }: PlaylistInfoProps) => {
  return (
    <div className="flex gap-3">
      <div className="min-w-0 flex-1">
        <h3
          className="
 font-medium line-clamp-1 lg:line-clamp-2 text-sm break-words"
        >
          {data.name}
        </h3>
        <p className="text-sm text-muted-foreground">Playlist</p>
        <p className="text-sm text-muted-foreground font-semibold hover:text-primary">
          View full playlist
        </p>
      </div>
    </div>
  );
};
