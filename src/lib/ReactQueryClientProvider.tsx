"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

export default function ReactQueryClientProvider({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
