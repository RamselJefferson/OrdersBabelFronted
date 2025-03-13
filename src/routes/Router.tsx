import { Routes, Route } from "react-router-dom";

// Pages

import Orders from "../pages/orders/Index";




const RouteConfig: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Orders />}>

      </Route>
    </Routes>
 

  );
};

export default RouteConfig;
