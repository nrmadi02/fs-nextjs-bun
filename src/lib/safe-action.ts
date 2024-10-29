import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action";
import { z } from "zod";

import { getServerAuthSession } from "@/features/auth/lib/next-auth.option";

export const actionClient = createSafeActionClient({
  handleServerError: async (error) => {
    throw new Error(error.message ?? DEFAULT_SERVER_ERROR_MESSAGE);
  },
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
}).use(async ({ next, clientInput, metadata }) => {
  console.log("LOGGING MIDDLEWARE");

  const startTime = performance.now();
  const result = await next();

  const endTime = performance.now();

  console.log("Client input ->", clientInput);
  console.log("Metadata ->", metadata);
  console.log("Action execution took", endTime - startTime, "ms");
  return result;
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await getServerAuthSession();

  if (!session) {
    throw new Error("Unauthorized");
  }
  return next({ ctx: { userId: session.user.id } });
});
