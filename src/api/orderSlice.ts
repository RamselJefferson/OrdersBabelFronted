import { apiSlice } from "./apiSlice";
import { iOrder } from '../interfaces/models/iOrder';

const orderSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getOrder: build.query<iOrder[], void>({
      query: () => "/orders",
      providesTags: ["Orders"],
    }),
    getById: build.query<iOrder, number>({
      query: (id) => `/orders/GetById/${id}`,
      providesTags: ["Orders"],
    }),
    createOrder: build.mutation({
      query: (newProduct) => ({
        url: "/orders",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Orders"],
    }),
    updateOrder: build.mutation({
      query: (updatedOrder) => ({
        url: `/orders`,
        method: "PUT",
        body: updatedOrder,
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: build.mutation({
      query: (id) => ({
        url: `orders/Delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOrderQuery,
  useCreateOrderMutation,
  useGetByIdQuery,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
} = orderSlice;
