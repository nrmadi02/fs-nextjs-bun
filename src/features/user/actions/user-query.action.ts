"use server";

import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action";
import { z } from "zod";

import prisma from "@/lib/db";
import { abilityMiddleware, authMiddleware } from "@/lib/middleware-action";
import { logger } from "@/lib/utils";

const publicActionClient = createSafeActionClient({
  handleServerError: async (error) => {
    logger.error(error.message, "Server error");
    throw new Error(error.message ?? DEFAULT_SERVER_ERROR_MESSAGE);
  },
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
});

const authActionClient = publicActionClient.use(authMiddleware).use(abilityMiddleware);

export const getUsers = authActionClient
  .metadata({
    actionName: "getUsers",
  })
  .action(async () => {
    const users = await prisma.user.findMany();

    return users;
  });
