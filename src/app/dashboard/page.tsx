"use client";

import { signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { data } = useSession();

  console.log(data?.user);
  return (
    <div className="p-3">
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}
