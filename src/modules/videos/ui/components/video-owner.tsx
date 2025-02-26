import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SubscriptionButton } from "@/modules/subscriptions/ui/components/subscription-button";
import { UserAvatar } from "@/components/user-avatar";
import { UserInfo } from "@/modules/users/ui/components/user-info";
import { VideoGetOneOutput } from "../../types";
import { useAuth } from "@clerk/nextjs";

interface VideoOwnerProps {
  user: VideoGetOneOutput["user"];
  videoId: string;
}

export const VideoOwner = ({ user, videoId }: VideoOwnerProps) => {
  const { userId } = useAuth();
  return (
    <div className="flex items-center sm:items-start justify-between sm:justify-start gap-3">
      <Link href={`/users/${user.id}`}>
        <div className="flex items-center gap-3 min-w-0">
          <UserAvatar size={"lg"} name={user.name} imageUrl={user.imageUrl} />
          <div className="flex flex-col gap-1 min-w-0">
            <UserInfo name={user.name} size={"lg"} />
            {/* todo: fetch correct count */}
            <span className="text-muted-foreground text-sm line-clamp-1">
              {0} Subscribers
            </span>
          </div>
        </div>
      </Link>
      {userId == user.clerkId ? (
        <Button className="rounded-full" asChild variant={"secondary"}>
          <Link href={`/studio/videos/${videoId}`}>Edit</Link>
        </Button>
      ) : (
        <SubscriptionButton
          isSubscribed={false}
          disabled={false}
          size={"sm"}
          onClick={() => {}}
          className="flex-none"
        />
      )}
    </div>
  );
};
