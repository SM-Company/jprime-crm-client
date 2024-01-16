import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login } from "../pages/Index";

import ProtectedRoutes from "./ProtectedRoutes";
import { TestRoutes } from "../feactures/Test/Index";
import Clients from "../feactures/Clients/Clients";
import InventoryRoutes from "../feactures/Inventory/routes/InventoryRoutes";
import { CustomerRoutes } from "../feactures/Customers/Index";
import { SaleRoutes } from "../feactures/Sales/Index";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/clients/*" element={<Clients />} />
          <Route path="/test/*" element={<TestRoutes />} />
          <Route path="/inventory/*" element={<InventoryRoutes />} />
          <Route path="/customers/*" element={<CustomerRoutes />} />
          <Route path="/sales/*" element={<SaleRoutes />} />
          <Route path="/*" element={<SaleRoutes />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
