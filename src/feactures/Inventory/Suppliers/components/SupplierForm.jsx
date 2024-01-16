import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Select, Option, Spinner, Typography } from "@material-tailwind/react";
import suplierService from "../services/supplier.service";
import statusService from "../../../../services/status/status.service";
import AlertComponent from "../../../../components/Alert/Alert";
import CustomModal from "../../../../components/CustomModal/CustomModal";
import CustomForm from "../../../../components/CustomForm/CustomForm";
import InputLayout from "../../../../layouts/InputLayout";
import { CustomInput, CustomPasswordInput, CustomSelect, CustomTextarea } from "../../../../components/CustomFields/CustomFields";
import CustomFormSubtitle from "../../../../components/FormComponents/CustomFormSubtitle";

function SupplierForm({ isOpen, handleOpen, supplierId }) {
  const [formData, setFormData] = useState({});
  const [statuses, setStatuses] = useState([]);
  const [alertInfo, setAlertInfo] = useState({ openAlert: false });
  const [isSending, setIsSending] = useState(false);

  const getStatuses = async () => {
    const data = await statusService.get();
    if (data.status) {
      setStatuses(data.statuses);
    }
  };

  const setFormInfo = async () => {
    if (!supplierId) return;
    const data = await suplierService.show(supplierId);
    if (data.status) {
      setFormData(data.supplier);
    }
  };

  useEffect(() => {
    setFormData({})
    if (!statuses.length) getStatuses();
    if (supplierId) setFormInfo();
  }, [isOpen]);

  const handleOpenAlertComponent = (props) => {
    setAlertInfo((prevAlertInfo) => ({
      ...props,
      openAlert: !prevAlertInfo.openAlert,
    }));
  };

  const saveSuplier = async (e) => {
    e.preventDefault();
    setIsSending(true);
    const mode = supplierId ? "update" : "store";
    const data = await suplierService[mode](formData);
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
      <CustomModal isOpen={isOpen} title={supplierId ? "Update Suplier" : "New Suplier"} size="2xl" onClose={handleOpen}>
        <CustomForm buttonName="Save" onSubmit={saveSuplier} isSending={isSending}>
          <CustomFormSubtitle Title="Personal Information" />
          <InputLayout className="" items="3">
            <CustomInput name="name" label="Name" color="purple" handleChange={handleChange} value={formData?.name} />
            <CustomInput name="email" label="Email" color="purple" handleChange={handleChange} value={formData?.email} />
            <CustomInput name="phone" label="Phone" color="purple" handleChange={handleChange} value={formData?.phone} />
            <CustomInput name="country" label="Country" color="purple" handleChange={handleChange} value={formData?.country} />
            <CustomInput name="city" label="City" color="purple" handleChange={handleChange} value={formData?.city} />
            <CustomInput name="address" label="Address" color="purple" handleChange={handleChange} value={formData?.address} />
          </InputLayout>
          <CustomFormSubtitle containerClass="" Title="Company Information" />
          <InputLayout className="" items="3">
            <CustomInput name="company_name" label="Company name" color="purple" handleChange={handleChange} value={formData?.company_name} />
            <CustomInput name="company_address" label="Company address" color="purple" handleChange={handleChange} value={formData?.company_address} />
            <CustomInput name="type_of_service" label="Type of service" color="purple" handleChange={handleChange} value={formData?.type_of_service} />
            <CustomInput name="category_of_products" label="Type of product" color="purple" handleChange={handleChange} value={formData?.category_of_products} />
          </InputLayout>
          <CustomFormSubtitle containerClass="" Title="Notes" />
          <InputLayout items={1}>
            <CustomTextarea name="notes" label="Suplier notes" color="purple" handleChange={handleChange} value={formData?.notes} />
          </InputLayout>
        </CustomForm>
      </CustomModal>
      <AlertComponent alertInfo={alertInfo} handleOpenAlertComponent={handleOpenAlertComponent} />
    </>
  );
}

export default SupplierForm;