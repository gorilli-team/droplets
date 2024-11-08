// lib/apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://api-v2.lens.dev", // Ensure this is the correct endpoint
  // If required, add headers here
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
