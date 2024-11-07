import { createMiddleware } from "next-safe-action";

import { userById } from "@/features/_shared/actions/get-ability.action";
import { getServerAuthSession } from "@/features/auth/lib/next-auth.option";

import redisClient from "./redis";
import { logger } from "./utils";

const authMiddleware = createMiddleware().define(async ({ next }) => {
  const session = await getServerAuthSession();

  if (!session) throw new Error("Unauthorized");

  return next({ ctx: { userId: session.user.id } });
});

const abilityMiddleware = createMiddleware<{
  ctx: {
    userId: string;
  };
}>().define(async ({ next, ctx }) => {
  const cacheKey = `user:${ctx.userId}:ability`;
  const result = <T>(user: T) => next({ ctx: { user } });

  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) return result(JSON.parse(cachedData));

    const user = await userById(ctx.userId);

    if (user)
      await redisClient.set(cacheKey, JSON.stringify(user), {
        EX: 60 * 60 * 5,
      });

    return result(user);
  } catch (err) {
    logger.error(err, "Error fetching data from Redis cache");
    const user = await userById(ctx.userId);
    return result(user);
  }
});

export { authMiddleware, abilityMiddleware };
