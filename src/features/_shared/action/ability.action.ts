"use server";

import prisma from "@/lib/db";
import { authActionClient } from "@/lib/safe-action";

export const getAbility = authActionClient
  .metadata({ actionName: "getAbility" })
  .action(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: { id: ctx.userId },
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

    return user;
  });
