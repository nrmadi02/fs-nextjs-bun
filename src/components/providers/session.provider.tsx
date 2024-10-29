"use client";

import { SessionProvider } from "next-auth/react";
import React, { type PropsWithChildren } from "react";

export default function SessionClientProvider(props: PropsWithChildren) {
  return <SessionProvider>{props.children}</SessionProvider>;
}
