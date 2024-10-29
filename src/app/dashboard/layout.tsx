import { PropsWithChildren } from "react";

import QueryClientProvider from "@/components/providers/query-client.provider";

export default function DashboardLayout(props: PropsWithChildren) {
  const { children } = props;
  return <QueryClientProvider>{children}</QueryClientProvider>;
}
