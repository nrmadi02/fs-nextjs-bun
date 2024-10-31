import {
  createMiddleware,
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { z } from "zod";

import { userById } from "@/features/_shared/action/ability.action";
import { getServerAuthSession } from "@/features/auth/lib/next-auth.option";

import redisClient from "./redis";

const logMiddleware = createMiddleware().define(async ({ next, clientInput, metadata }) => {
  console.log("LOGGING MIDDLEWARE");

  const startTime = performance.now();
  const result = await next();

  const endTime = performance.now();

  if (clientInput) console.log("Client input ->", clientInput);
  console.log("Metadata ->", metadata);
  console.log("Action execution took", endTime - startTime, "ms");
  return result;
});

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
    console.error("Error fetching data from Redis cache:", err);
    const user = await userById(ctx.userId);
    return result(user);
  }
});

export const actionClient = createSafeActionClient({
  handleServerError: async (error) => {
    throw new Error(error.message ?? DEFAULT_SERVER_ERROR_MESSAGE);
  },
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
}).use(logMiddleware);

export const authActionClient = actionClient.use(authMiddleware).use(abilityMiddleware);
