import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { comments, users } from "@/db/schema";
import { eq, getTableColumns } from "drizzle-orm";

import db from "@/db";
import { z } from "zod";

export const commentsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ videoId: z.string().uuid(), value: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { videoId, value } = input;
      const { id: userId } = ctx.user;

      const [createdComment] = await db
        .insert(comments)
        .values({
          videoId,
          value,
          userId,
        })
        .returning();

      return createdComment;
    }),

  getMany: baseProcedure
    .input(z.object({ videoId: z.string().uuid() }))
    .query(async ({ input }) => {
      const { videoId } = input;

      const allComments = await db
        .select({
          ...getTableColumns(comments),
          user: users,
        })
        .from(comments)
        .where(eq(comments.videoId, videoId))
        .innerJoin(users, eq(comments.userId, users.id));

      return allComments;
    }),
});
