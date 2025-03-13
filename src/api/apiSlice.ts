import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7145/api' }),
  tagTypes: [ "Orders"],
  endpoints: () => ({}),
})