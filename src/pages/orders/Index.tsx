import { Button, Grid } from "@mui/material";
import OrderList from "../../components/order/OrderList";
import { useModal } from "../../hooks/useModal";
import OrderSaveModal from "../../components/order/OrderSaveModal";

const Orders: React.FC = () => {
  const { open, handleOpen, handleClose } = useModal();

  return (
    <>
      <Grid item xs={12} mx={5}>
        <Button onClick={handleOpen} fullWidth variant="outlined" color="info">
          Create Order
        </Button>
        <OrderSaveModal open={open} onClose={handleClose} mode="add" />
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        gap={5}
        mx={0}
        mt={5}
      >
        <OrderList />
      </Grid>
    </>
  );
};

export default Orders;
