import { Prisma } from "@prisma/client";

import prisma from "@/lib/db";

export const userFindByEmail = async (email: string, select?: Prisma.UserSelect) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    select: select ?? {
      email: true,
    },
  });
};

export const userFindById = async (id: string, select?: Prisma.UserSelect) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: select ?? {
      email: true,
      name: true,
      role: true,
      id: true,
      verifiedAt: true,
    },
  });
};
