"use client";

import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();
export default function QueryClientProvider(props: PropsWithChildren) {
  const { children } = props;
  return (
    <TanstackQueryClientProvider client={queryClient}> {children} </TanstackQueryClientProvider>
  );
}
