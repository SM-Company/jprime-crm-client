import React, { useEffect, useState } from "react";
import productCategoryService from "./services/productCategory.service";
import ProductCategoryForm from "./components/ProductCategoryForm";
import CustomTable from "../../../components/CustomTable/CustomTable";
import AlertComponent from "../../../components/Alert/Alert";

const ProductCategories = () => {
  const [productCategoryData, setProductCategoryData] = useState([]);
  const [productCategoryId, setProductCategoryId] = useState("");
  const [alertInfo, setAlertInfo] = useState({ openAlert: false });

  const getProductCategories = async () => {
    const data = await productCategoryService.get();
    if (data.status) {
      setProductCategoryData(data.categories);
    }
  };

  useEffect(() => {
    getProductCategories();
  }, []);

  const TABLE_HEAD = [
    { name: "Code", key: "code" },
    { name: "Name", key: "name" },
    { name: "Description", key: "description" },
    { name: "Actions", key: "actions" },
  ];

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const handleFormModalOpen = () => {
    setIsFormModalOpen((prevState) => {
      if (prevState) {
        getProductCategories();
        setProductCategoryId("");
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
    setProductCategoryId(id);
    handleFormModalOpen();
  };

  const deleteProductCategory = async ({ id }) => {
    const data = await productCategoryService.delete(id);
    if (data.status) {
      getProductCategories();
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
      message: "Are you sure to delete this category",
      title: "Alert",
      mode: "DANGER",
      id,
      event: "DELETE",
      onConfirm: deleteProductCategory,
    });
  };

  return (
    <div className="p-5">
      <div className="max-w-full overflow-x-auto mt-5">
        <CustomTable
          tableName={"Product Category Manager"}
          TABLE_HEAD={TABLE_HEAD}
          items={productCategoryData}
          pagination={true}
          itemsPerPage={7}
          controls={true}
          onUpdate={handleOnUpdate}
          onDelete={handleOnDelete}
          handleFormModalOpen={handleFormModalOpen}
        />
      </div>
      <ProductCategoryForm isOpen={isFormModalOpen} handleOpen={handleFormModalOpen} productCategoryId={productCategoryId} />
      <AlertComponent alertInfo={alertInfo} handleOpenAlertComponent={handleOpenAlertComponent} />
    </div>
  );
};

export default ProductCategories;