// Hooks
import { useEffect, useState } from "react";
import { useCreateOrderMutation, useGetByIdQuery, useGetOrderQuery as useGetOrdersQuery, useUpdateOrderMutation } from "../../api/orderSlice";

// Mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  mode: string;
  orderId?: number;
};

function OrderSaveModal({ onClose, open, mode, orderId }: Props) {
  // State
  const [orderState, setOrderState] = useState({
    customerName: "",
    totalAmount: 0,
    orderDate: new Date(),
  });



  const { data: order, error, isLoading } = useGetByIdQuery(orderId || 0, {
    skip: !orderId, 
  });



  

  const [createOrder] = useCreateOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();

  // Handles
  const handleChange = (event: any) => {
    setOrderState({...orderState, [event.target.name]: event.target.value});
  }
  
  const handleClose = () => {
    if (mode === "add") setOrderState(prevState => ({...prevState}));
    return onClose();
  };

  const handleAccept = async (event: any) => {
    const { customerName, orderDate,  totalAmount} = orderState;
  
    if (customerName && orderDate && totalAmount ) {
      event.preventDefault();
      switch (mode) {
        case "add":
          await createOrder(orderState);
          break;
        case "update":
          await updateOrder({...orderState, id: orderId});
          break;
        default:
          break;
      }
      return handleClose();
    }
  };


  useEffect(() => {
    if (order && mode === "update") {
      setOrderState({
        customerName: order.customerName,
        totalAmount: Number(order.totalAmount),
        orderDate: new Date(order.orderDate),
      });
    } else if (mode === "add") {
      setOrderState({
        customerName: "",
        totalAmount: 0,
        orderDate: new Date(),
      });
    }
  }, [order, mode]);
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        {mode === "update" ? "Update Order" : "New Order"}
      </DialogTitle>
      <DialogContent sx={{ mt: 1 }}>

      {mode != "update" && (
  <FormControl
    sx={{ display: "flex", flexDirection: "row", gap: 1, mb: 3, mt: 3 }}
    fullWidth
  >
    <TextField
      name="orderDate"
      label="Date"
      type="date"
      value={
        mode === "update" && orderState?.orderDate
          ? orderState.orderDate.toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0]
      }
      onChange={handleChange}
      InputLabelProps={{ shrink: true }}
      fullWidth
    />
  </FormControl>
)}

        <FormControl sx={{ display: "flex", flexDirection: "row", gap: 1, mb: 3, mt: 3 }}
          fullWidth>
          <TextField
            name="customerName"
            label="customerName"
            type="text"
            multiline
            fullWidth
            variant="outlined"
            value={orderState.customerName}
            onChange={handleChange}
          />
        </FormControl>
        
        <FormControl sx={{ mb: 3 }} fullWidth>
          <TextField
            name="totalAmount"
            label="totalAmount"
            type="number"
            fullWidth
            variant="outlined"
            value={orderState.totalAmount}
            onChange={handleChange}
          />
        </FormControl>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleAccept}
          disabled={
            !(
              orderState.customerName &&
              orderState.orderDate &&
              orderState.totalAmount
            )
          }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default OrderSaveModal;