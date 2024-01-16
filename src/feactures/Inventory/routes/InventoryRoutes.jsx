import { Routes, Route } from "react-router-dom";
import Suppliers from "../Suppliers/Suppliers";
import ProductCategories from "../ProductCategories/ProductCategories";
import Products from "../Products/Products";

const ProductCategoryRouter = () => {
  return (
    <Routes>
      <Route path="suppliers" element={<Suppliers />} />
      <Route path="product-categories" element={<ProductCategories />} />
      <Route path="products" element={<Products />} />
    </Routes>
  );
};

export default ProductCategoryRouter;
