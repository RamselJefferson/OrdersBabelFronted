import { Grid } from "@mui/material";
import OrderList from "./../../components/order/OrderList";

const Home: React.FC = () => {
  return (
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
  );
};

export default Home;
