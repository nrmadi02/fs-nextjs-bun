// ability.ts
import { AbilityBuilder, PureAbility } from "@casl/ability";
import { Permission, Role, Subject, User } from "@prisma/client";

type Actions = "manage" | "create" | "read" | "update" | "delete";
type Subjects = string | "all";

export type AppAbility = PureAbility<[Actions, Subjects]>;

export async function defineAbilityFor(
  user:
    | (User & {
        role: Role & {
          permissions: Array<
            Permission & {
              subject: Subject;
            }
          >;
        };
      })
    | null
): Promise<AppAbility> {
  const { can, rules } = new AbilityBuilder<PureAbility<[Actions, Subjects]>>(PureAbility);

  if (user) {
    user.role.permissions.forEach((permission) => {
      can(permission.action as Actions, permission.subject.name);
    });
  }

  return new PureAbility<[Actions, Subjects]>(rules);
}
