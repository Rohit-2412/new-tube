"use client";

import {
  UserPageBanner,
  UserPageBannerSkeleton,
} from "../components/user-page-banner";
import {
  UserPageInfo,
  UserPageInfoSkeleton,
} from "../components/user-page-info";

import { ErrorBoundary } from "react-error-boundary";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { trpc } from "@/trpc/client";

interface UserSectionProps {
  userId: string;
}

export const UserSection = ({ userId }: UserSectionProps) => {
  return (
    <Suspense fallback={<UserSectionSkeleton />}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <UserSectionSuspense userId={userId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const UserSectionSkeleton = () => {
  return (
    <div className="flex flex-col">
      <UserPageBannerSkeleton />
      <UserPageInfoSkeleton />
      <Separator />
    </div>
  );
};

const UserSectionSuspense = ({ userId }: UserSectionProps) => {
  const [user] = trpc.users.getOne.useSuspenseQuery({ id: userId });

  return (
    <div className="flex flex-col">
      <UserPageBanner user={user} />
      <UserPageInfo user={user} />
      <Separator />
    </div>
  );
};
