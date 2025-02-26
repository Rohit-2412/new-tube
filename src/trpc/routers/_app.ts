import { categoriesRouter } from "@/modules/categories/server/procedures";
import { commentsRouter } from "@/modules/comments/server/procedures";
import { createTRPCRouter } from "../init";
import { studioRouter } from "@/modules/studio/server/procedures";
import { subscriptionsRouter } from "@/modules/subscriptions/server/procedure";
import { videoReactionsRouter } from "@/modules/video-reactions/server/procedures";
import { videoViewsRouter } from "@/modules/video-views/server/procedures";
import { videosRouter } from "@/modules/videos/server/procedures";

export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  comments: commentsRouter,
  studio: studioRouter,
  subscriptions: subscriptionsRouter,
  videos: videosRouter,
  videoReactions: videoReactionsRouter,
  videoViews: videoViewsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
