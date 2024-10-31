"use server";

import prisma from "@/lib/db";
import { authActionClient } from "@/lib/safe-action";

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

export const getAbility = authActionClient
  .metadata({ actionName: "getAbility" })
  .action(async ({ ctx }) => {
    return ctx.user;
  });
