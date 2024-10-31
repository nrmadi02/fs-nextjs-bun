"use client";

import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { getUsers } from "@/features/user/actions/user-query.action";
import { useAbility } from "@/hooks/use-ability";

export default function Dashboard() {
  const ability = useAbility();

  const { data: users } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUsers(),
    retry: 1,
  });

  console.log(users, ability?.can("read", "Role"));
  return (
    <div className="p-3">
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}
