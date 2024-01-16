import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Select, Option, Spinner, Typography } from "@material-tailwind/react";
import clientService from "../services/client.service";
import statusService from "../../../services/status/status.service";
import Datepicker from "react-tailwindcss-datepicker";
import AlertComponent from "../../../components/Alert/Alert";
import CustomModal from "../../../components/CustomModal/CustomModal";
import CustomForm from "../../../components/CustomForm/CustomForm";
import InputLayout from "../../../layouts/InputLayout";
import { CustomInput, CustomPasswordInput, CustomSelect, CustomTextarea } from "../../../components/CustomFields/CustomFields";
import CustomFormSubtitle from "../../../components/FormComponents/CustomFormSubtitle";

function ClientForm({ isOpen, handleOpen, clientId }) {
  // const [isLoading, setIsLoading] = useState(false);
  // const [statuses, setStatuses] = useState([]);
  // const [formValues, setFormValues] = useState({
  //   kiv: "",
  //   bus_plate: "",
  //   vin: "",
  //   color: "",
  //   brand: "",
  //   mile: "",
  //   year: "",
  //   passenger: "",
  //   oil_date: "",
  //   date: "",
  //   status_id: "",
  //   status_name: "",
  // });

  // const setFormInfo = async () => {
  //   const data = await busesService.show(BusesFormInfo.id);
  //   if (data.status) {
  //     setFormValues(data.data);
  //   }
  // };

  // useEffect(() => {
  //   getStatuses();
  //   !BusesFormInfo.create && BusesFormInfo.open && setFormInfo();
  //   !BusesFormInfo.open && resetPageData();
  // }, [BusesFormInfo.open]);

  // const resetPageData = () => {
  //   setIsLoading(false);
  //   setStatuses([]);
  //   setFormValues({
  //     kiv: "",
  //     bus_plate: "",
  //     vin: "",
  //     color: "",
  //     brand: "",
  //     mile: "",
  //     year: "",
  //     passenger: "",
  //     oil_date: "",
  //     date: "",
  //     status_id: "",
  //     status_name: "",
  //   });
  // };

  // const handleSetFormValues = (key, value) => {
  //   setFormValues({ ...formValues, [key]: value });
  // };

  // const updateBus = async () => {
  //   setIsLoading(true);
  //   const data = await busesService.update(BusesFormInfo.id, formValues);
  //   if (data.status) {
  //     getBuses();
  //     handleOpenBusesForm();
  //   }
  //   setIsLoading(false);
  // };

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
    if (!clientId) return;
    const data = await clientService.show(clientId);
    if (data.status) {
      setFormData(data.client);
    }
  };

  useEffect(() => {
    setFormData({})
    if (!statuses.length) getStatuses();
    if (clientId) setFormInfo();
  }, [isOpen]);

  const handleOpenAlertComponent = (props) => {
    setAlertInfo((prevAlertInfo) => ({
      ...props,
      openAlert: !prevAlertInfo.openAlert,
    }));
  };

  const saveClient = async (e) => {
    e.preventDefault();
    setIsSending(true);
    const mode = clientId ? "update" : "store";
    const data = await clientService[mode](formData);
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
      <CustomModal isOpen={isOpen} title={clientId ? "Update Client" : "New Client"} size="2xl" onClose={handleOpen}>
        <CustomForm buttonName="Save" onSubmit={saveClient} isSending={isSending}>
          <CustomFormSubtitle Title="Personal Information" />
          <InputLayout className="" items="3">
            <CustomInput name="user.email" label="Email" color="purple" handleChange={handleChange} hidden={clientId} />
            <CustomPasswordInput name="user.password" label="Password" color="purple" handleChange={handleChange} hidden={clientId} />
            <CustomInput name="name" label="Name" color="purple" handleChange={handleChange} value={formData?.name} />
            <CustomInput name="phone" label="Phone" color="purple" handleChange={handleChange} value={formData?.phone} />
            <CustomInput name="residential_address" label="Residential address" color="purple" handleChange={handleChange} value={formData?.residential_address} />
            <CustomSelect name="user.status_id" label="Status" color="purple" handleChange={handleChange} items={statuses} itemKey="name" value={`${formData?.user?.status?.id}`} />
          </InputLayout>
          <CustomFormSubtitle containerClass="" Title="Company Information" />
          <InputLayout className="" items="3">
            <CustomInput name="company_name" label="Company name" color="purple" handleChange={handleChange} value={formData?.company_name} />
            <CustomInput name="company_address" label="Company address" color="purple" handleChange={handleChange} value={formData?.company_address} />
            <CustomInput name="type_of_company" label="Type of company" color="purple" handleChange={handleChange} value={formData?.type_of_company} />
          </InputLayout>
          <CustomFormSubtitle containerClass="" Title="Notes" />
          <InputLayout items={1}>
            <CustomTextarea name="notes" label="Client notes" color="purple" handleChange={handleChange} value={formData?.notes} />
          </InputLayout>
        </CustomForm>
      </CustomModal>
      <AlertComponent alertInfo={alertInfo} handleOpenAlertComponent={handleOpenAlertComponent} />
    </>
  );
}

export default ClientForm;
