import { Routes, Route } from "react-router-dom";
import Sales from "../Sales";

const SaleRoutes = () => {
  return (
    <Routes>
      <Route index element={<Sales />} />
    </Routes>
  );
};

export default SaleRoutes;
