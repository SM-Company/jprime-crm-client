import { Routes, Route } from "react-router-dom";
import Test from "../Test";

const TestRoutes = () => {
  return (
    <Routes>
      <Route index element={<Test />} />
    </Routes>
  );
};

export default TestRoutes;
