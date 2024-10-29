// ability.ts
import { AbilityBuilder, PureAbility } from "@casl/ability";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Actions = "manage" | "create" | "read" | "update" | "delete";
type Subjects = string | "all";

export type AppAbility = PureAbility<[Actions, Subjects]>;

export async function defineAbilityFor(userId: string): Promise<AppAbility> {
  const { can, rules } = new AbilityBuilder<PureAbility<[Actions, Subjects]>>(PureAbility);

  const user = await prisma.user.findUnique({
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

  if (user) {
    user.role.permissions.forEach((permission) => {
      can(permission.action as Actions, permission.subject.name);
    });
  }

  return new PureAbility<[Actions, Subjects]>(rules);
}
