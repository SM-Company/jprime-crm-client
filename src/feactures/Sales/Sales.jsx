import React, { useEffect, useState } from "react";
import { Button, Card, CardFooter, Typography, Menu, MenuHandler, MenuList, MenuItem, Input } from "@material-tailwind/react";
import saleService from "./services/sale.service";
import SaleForm from "./components/SaleForm";
import CustomTable from "../../components/CustomTable/CustomTable";
import AlertComponent from "../../components/Alert/Alert";

const Sales = () => {
  const [saleData, setSaleData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [saleId, setSaleId] = useState("");
  const [alertInfo, setAlertInfo] = useState({ openAlert: false });

  const getSales = async () => {
    const data = await saleService.get();
    if (data.status) {
      setSaleData(data.sales);
    }
  };

  // useEffect(() => {
  //   getSales();
  // }, []);

  const TABLE_HEAD = [
    { name: "Code", key: "code" },
    { name: "Name", key: "name" },
    { name: "Category", key: "category.name" },
    { name: "Description", key: "description" },
    { name: "Price", key: "price" },
    { name: "Stok", key: "stock_quantity" },
    { name: "Status", key: "status.name" },
    { name: "Actions", key: "actions" },
  ];

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const handleFormModalOpen = () => {
    setIsFormModalOpen((prevState) => {
      if (prevState) {
        getSales();
        setSaleId("");
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
    setSaleId(id);
    handleFormModalOpen();
  };

  const deleteSale = async ({ id }) => {
    const data = await saleService.delete(id);
    if (data.status) {
      getSales();
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
      message: "Are you sure to delete this sale",
      title: "Alert",
      mode: "DANGER",
      id,
      event: "DELETE",
      onConfirm: deleteSale,
    });
  };

  return (
    <div className="p-5">
      <div className="max-w-full overflow-x-auto mt-5">
        <CustomTable
          tableName={"Sales Manager"}
          TABLE_HEAD={TABLE_HEAD}
          items={saleData}
          pagination={true}
          itemsPerPage={7}
          onUpdate={handleOnUpdate}
          onDelete={handleOnDelete}
          handleFormModalOpen={handleFormModalOpen}
          controls={true}
        />
      </div>
      <SaleForm isOpen={isFormModalOpen} handleOpen={handleFormModalOpen} saleId={saleId} />
      <AlertComponent alertInfo={alertInfo} handleOpenAlertComponent={handleOpenAlertComponent} />
    </div>
  );
};

export default Sales;
