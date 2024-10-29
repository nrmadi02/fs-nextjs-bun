"use client";

import { useQuery } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { getUsers } from "@/features/user/actions/user-query.action";

export default function Dashboard() {
  const { data } = useSession();

  const { data: users } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUsers(),
    retry: 1,
  });

  console.log(users, data);
  return (
    <div className="p-3">
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}
