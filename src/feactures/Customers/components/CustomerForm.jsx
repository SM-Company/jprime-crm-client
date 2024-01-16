import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Select, Option, Spinner, Typography } from "@material-tailwind/react";
import customerService from "../services/customer.service";
import statusService from "../../../services/status/status.service";
import AlertComponent from "../../../components/Alert/Alert";
import CustomModal from "../../../components/CustomModal/CustomModal";
import CustomForm from "../../../components/CustomForm/CustomForm";
import InputLayout from "../../../layouts/InputLayout";
import { CustomInput, CustomPasswordInput, CustomSelect, CustomTextarea } from "../../../components/CustomFields/CustomFields";
import CustomFormSubtitle from "../../../components/FormComponents/CustomFormSubtitle";

function CustomerForm({ isOpen, handleOpen, customerId }) {
  const [formData, setFormData] = useState({});
  const [customerStatuses, setCustomerStatuses] = useState([]);
  const [alertInfo, setAlertInfo] = useState({ openAlert: false });
  const [isSending, setIsSending] = useState(false);

  const getCustomerStatuses = async () => {
    const data = await customerService.getStatuses();
    if (data.status) {
      setCustomerStatuses(data.statuses);
    }
  };

  const setFormInfo = async () => {
    if (!customerId) return;
    const data = await customerService.show(customerId);
    if (data.status) {
      setFormData(data.customer);
    }
  };

  useEffect(() => {
    setFormData({})
    if (!customerStatuses.length) getCustomerStatuses();
    if (customerId) setFormInfo();
  }, [isOpen]);

  const handleOpenAlertComponent = (props) => {
    setAlertInfo((prevAlertInfo) => ({
      ...props,
      openAlert: !prevAlertInfo.openAlert,
    }));
  };

  const saveCustomer = async (e) => {
    e.preventDefault();
    setIsSending(true);
    const mode = customerId ? "update" : "store";
    const data = await customerService[mode](formData);
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
      <CustomModal isOpen={isOpen} title={customerId ? "Update Customer" : "New Customer"} size="2xl" onClose={handleOpen}>
        <CustomForm buttonName="Save" onSubmit={saveCustomer} isSending={isSending}>
          <CustomFormSubtitle Title="Personal Information" />
          <InputLayout className="" items="3">
            <CustomInput name="full_name" label="Full Name" color="purple" handleChange={handleChange} value={formData?.full_name} />
            <CustomInput name="email" label="Email" color="purple" handleChange={handleChange} value={formData?.email} />
            <CustomInput name="phone" label="Phone" color="purple" handleChange={handleChange} value={formData?.phone} />
            <CustomInput name="address" label="Address" color="purple" handleChange={handleChange} value={formData?.address} />
            <CustomInput name="city" label="City" color="purple" handleChange={handleChange} value={formData?.city} />
            <CustomInput name="state" label="State" color="purple" handleChange={handleChange} value={formData?.state} />
            <CustomInput name="postal_code" label="Postal Code" color="purple" handleChange={handleChange} value={formData?.postal_code} />
            <CustomInput name="country" label="Country" color="purple" handleChange={handleChange} value={formData?.country} />
            <CustomInput name="loyalty_points" label="Loyalty Points" color="purple" handleChange={handleChange} value={formData?.loyalty_points} />
            <CustomSelect name="status_id" label="Status" color="purple" handleChange={handleChange} value={`${formData?.status_id}`} items={customerStatuses} itemKey={"name"} />
          </InputLayout>
          <CustomFormSubtitle containerClass="" Title="Notes" />
          <InputLayout items={1}>
            <CustomTextarea name="notes" label="Customer notes" color="purple" handleChange={handleChange} value={formData?.notes} />
          </InputLayout>
        </CustomForm>
      </CustomModal>
      <AlertComponent alertInfo={alertInfo} handleOpenAlertComponent={handleOpenAlertComponent} />
    </>
  );
}

export default CustomerForm;