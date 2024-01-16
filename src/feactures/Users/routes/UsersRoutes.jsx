import { Routes, Route } from "react-router-dom";
import { Users } from "../Index";

const FashionRoutes = () => {
  return (
    <Routes>
      <Route index element={<Users />} />
    </Routes>
  );
};

export default FashionRoutes;
