import { PropsWithChildren } from "react";

import QueryClientProvider from "@/components/providers/query-client.provider";
import SessionClientProvider from "@/components/providers/session.provider";

export default function DashboardLayout(props: PropsWithChildren) {
  const { children } = props;
  return (
    <SessionClientProvider>
      <QueryClientProvider>{children}</QueryClientProvider>
    </SessionClientProvider>
  );
}
