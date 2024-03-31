import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Select, Option, Spinner, Typography } from "@material-tailwind/react";
import product from "../services/product.service";
import productCategoryService from "../../ProductCategories/services/productCategory.service";
import AlertComponent from "../../../../components/Alert/Alert";
import CustomModal from "../../../../components/CustomModal/CustomModal";
import CustomForm from "../../../../components/CustomForm/CustomForm";
import InputLayout from "../../../../layouts/InputLayout";
import { CustomInput, CustomPasswordInput, CustomSelect, CustomTextarea } from "../../../../components/CustomFields/CustomFields";
import CustomFormSubtitle from "../../../../components/FormComponents/CustomFormSubtitle";

function ProductForm({ isOpen, handleOpen, productId }) {
  const [formData, setFormData] = useState({});
  const [productStatues, setProductStatues] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [alertInfo, setAlertInfo] = useState({ openAlert: false });
  const [isSending, setIsSending] = useState(false);

  const setFormInfo = async () => {
    if (!productId) return;
    const data = await product.show(productId);
    console.log(data.product);
    if (data.status) {
      setFormData(data.product);
    }
  };

  const getProductStatues = async () => {
    const data = await product.statuses(productId);
    if (data.status) {
      setProductStatues(data.statuses);
    }
  };

  const getProductCategories = async () => {
    const data = await productCategoryService.get();
    if (data.status) {
      setProductCategories(data.categories);
    }
  };

  useEffect(() => {
    setFormData({});
    if (productId) setFormInfo();
    if (isOpen) {
      getProductStatues();
      getProductCategories();
    }
  }, [isOpen]);

  const handleOpenAlertComponent = (props) => {
    setAlertInfo((prevAlertInfo) => ({
      ...props,
      openAlert: !prevAlertInfo.openAlert,
    }));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    setIsSending(true);
    const mode = productId ? "update" : "store";
    const data = await product[mode](formData);
    if (data.status) {
      handleOpen();
    } else {
      handleOpenAlertComponent({
        message: data.message,
        title: "Error",
        mode: "DANGER",
        event: "INFO",
      });
    }
    setIsSending(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nameParts = name.split(".");
    const updateNestedState = (data, parts, value) => {
      const [currentPart, ...remainingParts] = parts;
      if (!remainingParts.length) {
        return { ...data, [currentPart]: value };
      }
      return {
        ...data,
        [currentPart]: updateNestedState(data[currentPart] || {}, remainingParts, value),
      };
    };
    setFormData((prevData) => updateNestedState(prevData, nameParts, value));
  };

  return (
    <>
      <CustomModal isOpen={isOpen} title={productId ? "Update Product" : "New Product"} size="2xl" onClose={handleOpen}>
        <CustomForm buttonName="Save" onSubmit={saveProduct} isSending={isSending}>
          <CustomFormSubtitle Title="Product Information" />
          <InputLayout className="" items="2">
            <CustomInput name="name" label="Name" color="purple" handleChange={handleChange} value={formData?.name} />
            <CustomInput name="unit_price" label="Price" color="purple" handleChange={handleChange} value={formData?.unit_price} />
          </InputLayout>

          <InputLayout className="mt-3" items={3}>
            <CustomInput name="stock_quantity" label="Stock" color="purple" handleChange={handleChange} value={formData?.stock_quantity} />
            <CustomSelect name="category_id" label="Category" color="purple" handleChange={handleChange} value={formData?.category_id} items={productCategories} itemKey={"name"} />
            <CustomSelect name="status_id" label="Status" color="purple" handleChange={handleChange} value={formData?.status_id} items={productStatues} itemKey={"name"} />
          </InputLayout>
          <InputLayout className="mt-4" items="1">
            <CustomTextarea name="description" label="Description" color="purple" handleChange={handleChange} value={formData?.description} />
          </InputLayout>
        </CustomForm>
      </CustomModal>
      <AlertComponent alertInfo={alertInfo} handleOpenAlertComponent={handleOpenAlertComponent} />
    </>
  );
}

export default ProductForm;
