import { useGetOrderQuery } from "../../api/orderSlice";
import NoContent from "../error/NoContent";
import OrderCard from "./OrderCard";


const OrderList: React.FC = () => {
  const { data = [], isError } = useGetOrderQuery();
  return (
    <>
      {!isError ? (
       
          <OrderCard  orders={data} />
    
      ) : (
        <NoContent entity="order" />
      )}
    </>
  );
};

export default OrderList;
