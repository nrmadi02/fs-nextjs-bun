"use server";

import { hash } from "bcrypt";
import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action";
import { z } from "zod";

import { userFindByEmail } from "@/helpers/user.helper";
import prisma from "@/lib/db";
import { exclude, logger } from "@/lib/utils";

import { registerSchema } from "../types/register-request.type";

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

export const registerUser = publicActionClient
  .schema(registerSchema)
  .metadata({ actionName: "registerUser" })
  .action(async ({ parsedInput: { name, email, password } }) => {
    const existUser = await userFindByEmail(email);

    if (existUser) {
      throw new Error("Email already exists");
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await hash(password, 10),
        role: {
          connect: {
            name: "user",
          },
        },
      },
    });

    return exclude(user, ["password", "roleId", "verifiedAt"]);
  });
