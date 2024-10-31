import { useQuery } from "@tanstack/react-query";

import { getAbility } from "@/features/_shared/action/ability.action";
import { defineAbilityFor } from "@/lib/ability";

export function useAbility() {
  const { data } = useQuery({
    queryKey: ["ability"],
    queryFn: () => getAbility(),
    refetchInterval: 60000 * 2,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchIntervalInBackground: false,
    retry: 1,
  });

  const ability = defineAbilityFor(data?.data);

  return ability;
}
