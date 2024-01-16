import { Routes, Route } from "react-router-dom";
import Customers from "../Customers";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route index element={<Customers />} />
    </Routes>
  );
};

export default CustomerRoutes;
