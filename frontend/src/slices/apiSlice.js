import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Expenses_Categories", "Transactions", "Dashboard", "Stats", "Bank", "Vendor"],
  endpoints: (builder) => ({}),
});
