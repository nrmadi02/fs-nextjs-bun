"use server";

import { defineAbilityFor } from "@/lib/ability";
import prisma from "@/lib/db";
import { authActionClient } from "@/lib/safe-action";

export const getAbility = authActionClient.action(async ({ ctx }) => {
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
  const ability = await defineAbilityFor(user);

  return ability;
});
