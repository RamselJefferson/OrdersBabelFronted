import {
  useDeleteOrderMutation,
  useGetOrderQuery,
} from "../../api/orderSlice";

// MUI
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  orderId?: number;
};

function OrderDeleteModal({ onClose, open, orderId }: Props) {
  const { data } = useGetOrderQuery();
  const [deleteOrder] = useDeleteOrderMutation();

  const handleAccept = async () => {
     await deleteOrder(orderId);

    onClose(); 

  
  };
  

  

  const getOrderName = () =>
    data?.filter((p) => p.id == orderId).map((p) => p.customerName);

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Delete Order</DialogTitle>
        <DialogContent>
          Are you sure to delete order?!
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleAccept}>
            Delete
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default OrderDeleteModal;
