import React, { useEffect, useState } from "react";
import supplierService from "./services/supplier.service";
import SupplierForm from "./components/SupplierForm";
import CustomTable from "../../../components/CustomTable/CustomTable";
import AlertComponent from "../../../components/Alert/Alert";

const Suppliers = () => {
  const [supplierData, setSupplierData] = useState([]);
  const [supplierId, setSupplierId] = useState("");
  const [alertInfo, setAlertInfo] = useState({ openAlert: false });

  const getSuppliers = async () => {
    const data = await supplierService.get();
    if (data.status) {
      setSupplierData(data.suppliers);
    }
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  const TABLE_HEAD = [
    { name: "Code", key: "code" },
    { name: "Name", key: "name" },
    { name: "Email", key: "email" },
    { name: "Phone", key: "phone" },
    { name: "Country", key: "country" },
    { name: "City", key: "city" },
    { name: "Address", key: "address" },
    { name: "Company Name", key: "company_name" },
    { name: "Company Address", key: "company_address" },
    { name: "Type Of Service", key: "type_of_service" },
    { name: "Category Of Products", key: "category_of_products" },
    { name: "Actions", key: "actions" },
  ];

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const handleFormModalOpen = () => {
    setIsFormModalOpen((prevState) => {
      if (prevState) {
        getSuppliers();
        setSupplierId("");
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
    setSupplierId(id);
    handleFormModalOpen();
  };

  const deleteSupplier = async ({ id }) => {
    const data = await supplierService.delete(id);
    if (data.status) {
      getSuppliers();
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
      message: "Are you sure to delete this supplier",
      title: "Alert",
      mode: "DANGER",
      id,
      event: "DELETE",
      onConfirm: deleteSupplier,
    });
  };

  return (
    <div className="p-5">
      <div className="max-w-full overflow-x-auto mt-5">
        <CustomTable
          TABLE_HEAD={TABLE_HEAD}
          tableName={"Suppliers Manager"}
          items={supplierData}
          pagination={true}
          itemsPerPage={7}
          controls={true}
          onUpdate={handleOnUpdate}
          onDelete={handleOnDelete}
          handleFormModalOpen={handleFormModalOpen}
        />
      </div>
      <SupplierForm isOpen={isFormModalOpen} handleOpen={handleFormModalOpen} supplierId={supplierId} />
      <AlertComponent alertInfo={alertInfo} handleOpenAlertComponent={handleOpenAlertComponent} />
    </div>
  );
};

export default Suppliers;
