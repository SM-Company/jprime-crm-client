import React, { useEffect, useState } from "react";
import productService from "./services/product.service";
import ProductForm from "./components/ProductForm";
import CustomTable from "../../../components/CustomTable/CustomTable";
import AlertComponent from "../../../components/Alert/Alert";
import format from "../../../utils/format";

const Products = () => {
  const [productData, setProductData] = useState([]);
  const [productId, setProductId] = useState("");
  const [alertInfo, setAlertInfo] = useState({ openAlert: false });

  const getProducts = async () => {
    const data = await productService.get();
    if (data.status) {
      setProductData(data.products);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const TABLE_HEAD = [
    { name: "Code", key: "code" },
    { name: "Name", key: "name" },
    { name: "Category", key: "category.name" },
    { name: "Description", key: "description" },
    { name: "Price", key: "unit_price", formatter: format.price },
    { name: "Stok", key: "stock_quantity" },
    { name: "Status", key: "status.name" },
    { name: "Actions", key: "actions" },
  ];

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const handleFormModalOpen = () => {
    setIsFormModalOpen((prevState) => {
      if (prevState) {
        getProducts();
        setProductId("");
      }
      return !prevState;
    });
  };

  const handleOpenAlertComponent = (props) => {
    setAlertInfo((prevAlertInfo) => ({
      ...props,
      openAlert: !prevAlertInfo.openAlert,
    }));
  };

  const handleOnUpdate = (id) => {
    setProductId(id);
    handleFormModalOpen();
  };

  const deleteProduct = async ({ id }) => {
    const data = await productService.delete(id);
    if (data.status) {
      getProducts();
    } else {
      handleOpenAlertComponent({
        message: data.message,
        title: "Error",
        mode: "DANGER",
        event: "INFO",
      });
    }
  };

  const handleOnDelete = async (id) => {
    handleOpenAlertComponent({
      message: "Are you sure to delete this product",
      title: "Alert",
      mode: "DANGER",
      id,
      event: "DELETE",
      onConfirm: deleteProduct,
    });
  };

  return (
    <div className="p-5">
      <div className="max-w-full overflow-x-auto mt-5">
        <CustomTable
          tableName={"Products Manager"}
          TABLE_HEAD={TABLE_HEAD}
          items={productData}
          pagination={true}
          itemsPerPage={7}
          controls={true}
          onUpdate={handleOnUpdate}
          onDelete={handleOnDelete}
          handleFormModalOpen={handleFormModalOpen}
        />
      </div>
      <ProductForm isOpen={isFormModalOpen} handleOpen={handleFormModalOpen} productId={productId} />
      <AlertComponent alertInfo={alertInfo} handleOpenAlertComponent={handleOpenAlertComponent} />
    </div>
  );
};

export default Products;
