// app/ApolloProviderWrapper.tsx
"use client";

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "../src/lib/apollo-client";

interface ApolloProviderWrapperProps {
  children: ReactNode;
}

export default function ApolloProviderWrapper({
  children,
}: ApolloProviderWrapperProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
