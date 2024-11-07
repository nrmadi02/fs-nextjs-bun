"use server";

import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action";
import { z } from "zod";

import prisma from "@/lib/db";
import { abilityMiddleware, authMiddleware } from "@/lib/middleware-action";
import { logger } from "@/lib/utils";

export const userById = async (userId: string) =>
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

const authActionClient = createSafeActionClient({
  handleServerError: async (error) => {
    logger.error(error.message, "Server error");
    throw new Error(error.message ?? DEFAULT_SERVER_ERROR_MESSAGE);
  },
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
})
  .use(authMiddleware)
  .use(abilityMiddleware);

export const getAbility = authActionClient
  .metadata({ actionName: "getAbility" })
  .action(async ({ ctx }) => {
    console.log(ctx.user);
    return ctx.user;
  });
