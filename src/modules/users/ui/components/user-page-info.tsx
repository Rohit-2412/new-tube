import { useAuth, useClerk } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { SubscriptionButton } from "@/modules/subscriptions/ui/components/subscription-button";
import { UserAvatar } from "@/components/user-avatar";
import { UserGetOneOutput } from "../../types";
import { cn } from "@/lib/utils";
import { useSubscription } from "@/modules/subscriptions/hooks/use-subscription";

interface UserPageInfoProps {
  user: UserGetOneOutput;
}

export const UserPageInfoSkeleton = () => {
  return (
    <div className="py-6">
      {/* mobile layout */}
      <div className="flex flex-col md:hidden">
        <div className="flex items-center gap-3">
          <Skeleton className="h-[60px] w-[60px] rounded-full" />
          <div className="flex-1 min-w-0">
            <Skeleton className="h-6 w-32 rounded" />
            <Skeleton className="h-4 w-48 mt-1" />
          </div>
        </div>
        <Skeleton className="w-full mt-3 rounded-full h-10" />
      </div>

      {/* desktop layout */}
      <div className="md:flex items-start gap-4 hidden">
        <Skeleton className="h-[160px] w-[160px] rounded-full" />
        <div className="flex-1 min-w-0">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-48 mt-4" />
          <Skeleton className="w-32 mt-3 h-10 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const UserPageInfo = ({ user }: UserPageInfoProps) => {
  const clerk = useClerk();
  const { userId, isLoaded } = useAuth();
  const { isPending, onClick } = useSubscription({
    userId: user.id,
    isSubscribed: user.viewerSubscribed,
  });

  return (
    <div className="py-6">
      {/* mobile layout */}
      <div className="flex flex-col md:hidden">
        <div className="flex items-center gap-3">
          <UserAvatar
            size={"lg"}
            imageUrl={user.imageUrl}
            name={user.name}
            className="h-[60px] w-[60px]"
            onClick={() => {
              if (user.clerkId === userId) {
                clerk.openUserProfile();
              }
            }}
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold">{user.name}</h1>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <span>{user.subscriberCount} subscribers</span>
              <span>•</span>
              <span>{user.videoCount} videos</span>
            </div>
          </div>
        </div>

        {userId === user.clerkId ? (
          <Button
            variant={"secondary"}
            asChild
            className="w-full mt-3 rounded-full"
          >
            <Link prefetch href={`/studio`}>
              Go to studio
            </Link>
          </Button>
        ) : (
          <SubscriptionButton
            isSubscribed={user.viewerSubscribed}
            onClick={onClick}
            disabled={isPending || !isLoaded}
            className="w-full mt-3"
          />
        )}
      </div>

      {/* desktop layout */}
      <div className="md:flex items-start gap-4 hidden">
        <UserAvatar
          size={"xl"}
          imageUrl={user.imageUrl}
          name={user.name}
          className={cn(
            userId == user.clerkId &&
              "cursor-pointer hover:opacity-80 transition-opacity duration-300",
          )}
          onClick={() => {
            if (user.clerkId === userId) {
              clerk.openUserProfile();
            }
          }}
        />

        <div className="flex-1 min-w-0">
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-3">
            <span>{user.subscriberCount} subscribers</span>
            <span>•</span>
            <span>{user.videoCount} videos</span>
          </div>
          {userId === user.clerkId ? (
            <Button variant={"secondary"} asChild className="mt-3 rounded-full">
              <Link prefetch href={`/studio`}>
                Go to studio
              </Link>
            </Button>
          ) : (
            <SubscriptionButton
              isSubscribed={user.viewerSubscribed}
              onClick={onClick}
              disabled={isPending || !isLoaded}
              className="mt-3"
            />
          )}
        </div>
      </div>
    </div>
  );
};
