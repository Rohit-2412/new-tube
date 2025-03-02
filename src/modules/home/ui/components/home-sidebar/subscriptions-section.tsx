"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { DEFAULT_LIMIT } from "@/constants";
import Link from "next/link";
import { ListIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";
import { trpc } from "@/trpc/client";
import { usePathname } from "next/navigation";

export const SubscriptionsSectionSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4].map((i) => (
        <SidebarMenuItem key={i}>
          <SidebarMenuButton disabled>
            <Skeleton className="w-6 h-6 rounded-full shrink-0" />
            <Skeleton className="h-4 w-full" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
};

export const SubscriptionsSection = () => {
  const { data, isLoading } = trpc.subscriptions.getMany.useInfiniteQuery(
    { limit: DEFAULT_LIMIT },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4">
      <SidebarGroup>
        <SidebarGroupLabel>Subscriptions</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {isLoading && <SubscriptionsSectionSkeleton />}
            {!isLoading &&
              data?.pages
                .flatMap((page) => page.items)
                .map((subscription) => (
                  <SidebarMenuItem
                    key={`${subscription.creatorId}-${subscription.viewerId}`}
                  >
                    <SidebarMenuButton
                      tooltip={subscription.user.name}
                      asChild
                      isActive={pathname === `/users/${subscription.user.id}`}
                    >
                      <Link
                        href={`/users/${subscription.user.id}`}
                        className="flex items-center gap-4"
                      >
                        <UserAvatar
                          size="xs"
                          className="w-6 h-6"
                          imageUrl={subscription.user.imageUrl}
                          name={subscription.user.name}
                        />
                        <span className="text-sm">
                          {subscription.user.name}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

            {!isLoading && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === `/subscriptions`}
                >
                  <Link
                    href="/subscriptions"
                    className="flex items-center gap-4"
                  >
                    <ListIcon className="size-4" />
                    <span className="text-sm">All Subscriptions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </div>
  );
};
