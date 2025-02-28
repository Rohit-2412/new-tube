import { SubscriptionsVideosSection } from "../sections/subscriptions-videos-section";

export const SubscriptionsView = () => {
  return (
    <div className="max-w-[2400px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
      <div>
        <h1 className="text-2xl font-bold">Subscribed</h1>
        <p className="text-muted-foreground text-xs">
          Videos from your favorite creators
        </p>
      </div>
      <SubscriptionsVideosSection />
    </div>
  );
};
