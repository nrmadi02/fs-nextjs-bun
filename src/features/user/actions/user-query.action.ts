"use server";

import prisma from "@/lib/db";
import { authActionClient } from "@/lib/safe-action";

export const getUsers = authActionClient
  .metadata({
    actionName: "getUsers",
  })
  .action(async () => {
    const users = await prisma.user.findMany();

    return users;
  });
