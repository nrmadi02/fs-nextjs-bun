"use server";

import prisma from "@/lib/db";
import redisClient from "@/lib/redis";
import { authActionClient } from "@/lib/safe-action";

const userById = async (userId: string) =>
  await prisma.user.findUnique({
    where: { id: userId },
    include: {
      role: {
        include: {
          permissions: {
            include: {
              subject: true,
            },
          },
        },
      },
    },
  });

export const getAbility = authActionClient
  .metadata({ actionName: "getAbility" })
  .action(async ({ ctx }) => {
    const cacheKey = `user:${ctx.userId}:ability`;

    try {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        console.log("Fetching data from Redis cache");
        return JSON.parse(cachedData);
      }

      const user = await userById(ctx.userId);

      if (user) {
        await redisClient.set(cacheKey, JSON.stringify(user), {
          EX: 60 * 60 * 5, // 5 hours
        });
      }

      return user;
    } catch (err) {
      console.error("Error fetching data from Redis cache:", err);
      const user = await userById(ctx.userId);
      return user;
    }
  });
