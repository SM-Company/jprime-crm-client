import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Select, Option, Spinner, Typography } from "@material-tailwind/react";
import productCategory from "../services/productCategory.service";
import AlertComponent from "../../../../components/Alert/Alert";
import CustomModal from "../../../../components/CustomModal/CustomModal";
import CustomForm from "../../../../components/CustomForm/CustomForm";
import InputLayout from "../../../../layouts/InputLayout";
import { CustomInput, CustomPasswordInput, CustomSelect, CustomTextarea } from "../../../../components/CustomFields/CustomFields";
import CustomFormSubtitle from "../../../../components/FormComponents/CustomFormSubtitle";

function ProductCategoryForm({ isOpen, handleOpen, productCategoryId }) {
  const [formData, setFormData] = useState({});
  const [alertInfo, setAlertInfo] = useState({ openAlert: false });
  const [isSending, setIsSending] = useState(false);

  const setFormInfo = async () => {
    if (!productCategoryId) return;
    const data = await productCategory.show(productCategoryId);
    if (data.status) {
      setFormData(data.category);
    }
  };

  useEffect(() => {
    setFormData({})
    if (productCategoryId) setFormInfo();
  }, [isOpen]);

  const handleOpenAlertComponent = (props) => {
    setAlertInfo((prevAlertInfo) => ({
      ...props,
      openAlert: !prevAlertInfo.openAlert,
    }));
  };

  const saveProductCategory = async (e) => {
    e.preventDefault();
    setIsSending(true);
    const mode = productCategoryId ? "update" : "store";
    const data = await productCategory[mode](formData);
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
      <CustomModal isOpen={isOpen} title={productCategoryId ? "Update Category" : "New Category"} size="md" onClose={handleOpen}>
        <CustomForm buttonName="Save" onSubmit={saveProductCategory} isSending={isSending}>
          <CustomFormSubtitle Title="Category Information" />
          <InputLayout className="" items="1">
            <CustomInput name="name" label="Name" color="purple" handleChange={handleChange} value={formData?.name} />
            <CustomTextarea name="description" label="Description" color="purple" handleChange={handleChange} value={formData?.description}/>
          </InputLayout>
        </CustomForm>
      </CustomModal>
      <AlertComponent alertInfo={alertInfo} handleOpenAlertComponent={handleOpenAlertComponent} />
    </>
  );
}

export default ProductCategoryForm;