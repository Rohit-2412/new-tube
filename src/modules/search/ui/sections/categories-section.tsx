"use client";

import { ErrorBoundary } from "react-error-boundary";
import { FilterCarousel } from "@/components/filter-carousel";
import { Suspense } from "react";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";

interface CategoriesSectionProps {
  categoryId?: string;
}

export const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
  return (
    <Suspense fallback={<CategoriesSkeleton />}>
      <ErrorBoundary fallback={<p>Error... </p>}>
        <CategoriesSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const CategoriesSkeleton = () => (
  <FilterCarousel isLoading data={[]} onSelect={() => {}} />
);

const CategoriesSectionSuspense = ({ categoryId }: CategoriesSectionProps) => {
  const [categories] = trpc.categories.getMany.useSuspenseQuery();
  const data = categories.map(({ name, id }) => ({ label: name, value: id }));
  const router = useRouter();

  const onSelect = (value: string | null) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set("categoryId", value);
    } else {
      url.searchParams.delete("categoryId");
    }

    router.push(url.toString());
  };
  return <FilterCarousel value={categoryId} data={data} onSelect={onSelect} />;
};
