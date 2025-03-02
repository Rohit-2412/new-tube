import { categoriesRouter } from "@/modules/categories/server/procedures";
import { commentReactionsRouter } from "@/modules/comment-reactions/server/procedures";
import { commentsRouter } from "@/modules/comments/server/procedures";
import { createTRPCRouter } from "../init";
import { playlistsRouter } from "@/modules/playlists/server/procedures";
import { searchRouter } from "@/modules/search/server/procedure";
import { studioRouter } from "@/modules/studio/server/procedures";
import { subscriptionsRouter } from "@/modules/subscriptions/server/procedure";
import { suggestionsRouter } from "@/modules/suggestions/server/procedures";
import { usersRouter } from "@/modules/users/server/procedures";
import { videoReactionsRouter } from "@/modules/video-reactions/server/procedures";
import { videoViewsRouter } from "@/modules/video-views/server/procedures";
import { videosRouter } from "@/modules/videos/server/procedures";

export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  comments: commentsRouter,
  commentReactions: commentReactionsRouter,
  studio: studioRouter,
  subscriptions: subscriptionsRouter,
  videos: videosRouter,
  videoReactions: videoReactionsRouter,
  videoViews: videoViewsRouter,
  suggestions: suggestionsRouter,
  search: searchRouter,
  playlists: playlistsRouter,
  users: usersRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
