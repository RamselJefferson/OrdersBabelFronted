import { useState } from "react";
import { GenericService } from "../services/genericService";
import { iOrder } from "../interfaces/models/iOrder";

export const useOrders = () => {
  const [orders, setOrders] = useState<iOrder[]>([]);
  const orderService = new GenericService<iOrder>();

  const getAllOrders = async () => {
    try {
      const fetchedOrders = await orderService.getAll("/orders");
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  const createOrder = async (order: iOrder) => {
    try {
      const createdProduct = await orderService.add("/orders", order);
      setOrders((prevOrders) => [...prevOrders, createdProduct]);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const updateOrder = async (id: string, product: iOrder) => {
    try {
      await orderService.update(`/orders/${id}`, product);
      setOrders((prevOrders) =>
        prevOrders.map((prevOrders) =>
          prevOrders.id?.toString() === id
            ? { ...prevOrders, ...product }
            : prevOrders
        )
      );
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await orderService.delete(`/orders/${id}`);
      setOrders((prevOrders) =>
        prevOrders.filter((prevOrders) => prevOrders.id?.toString() !== id)
      );
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const getOrder = async (id: string) => {
    try {
      const product = await orderService.getById(`/orders/${id}`);
      setOrders([product]);
    } catch (error) {
      console.error("Error obtaining specific order:", error);
    }
  };

  return { orders, getOrder, getAllOrders, createOrder, updateOrder, deleteOrder };
};
