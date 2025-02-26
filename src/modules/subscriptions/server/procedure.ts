import { and, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { TRPCError } from "@trpc/server";
import db from "@/db";
import { subscriptions } from "@/db/schema";
import { z } from "zod";

export const subscriptionsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = input;

      if (userId == ctx.user.id) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const [createdSubscription] = await db
        .insert(subscriptions)
        .values({
          creatorId: userId,
          viewerId: ctx.user.id,
        })
        .returning();
      return createdSubscription;
    }),

  remove: protectedProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = input;

      if (userId == ctx.user.id) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const [removedSubscription] = await db
        .delete(subscriptions)
        .where(
          and(
            eq(subscriptions.viewerId, ctx.user.id),
            eq(subscriptions.creatorId, userId),
          ),
        )
        .returning();

      return removedSubscription;
    }),
});
