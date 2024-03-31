import { Routes, Route } from "react-router-dom";
import Sales from "../Sales";
import ShareSale from "../components/ShareSale/ShareSale";

const SaleRoutes = () => {
  return (
    <Routes>
      <Route index element={<Sales />} />
      <Route path="share/:id" element={<ShareSale />} />
      <Route path="*" element={<Sales />} />
    </Routes>
  );
};

export default SaleRoutes;
