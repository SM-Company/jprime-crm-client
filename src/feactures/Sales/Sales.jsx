import React, { useEffect, useState } from "react";
import { Button, Card, CardFooter, Typography, Menu, MenuHandler, MenuList, MenuItem, Input } from "@material-tailwind/react";
import saleService from "./services/sale.service";
import SaleForm from "./components/SaleForm";
import CustomTable from "../../components/CustomTable/CustomTable";
import AlertComponent from "../../components/Alert/Alert";
import printInvoicePdf from "./utils/printInvoicePdf";
import format from "../../utils/format";
import jsPDF from "jspdf";
import "jspdf-autotable";
import exportInvoiceExel from "./utils/exportInvoiceExel";

const Sales = () => {
  const [saleData, setSaleData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [saleId, setSaleId] = useState("");
  const [alertInfo, setAlertInfo] = useState({ openAlert: false });

  const getSales = async () => {
    const data = await saleService.get();
    if (data.status) {
      setSaleData(data.sales);
      // console.log(data.sales);
    }
  };

  useEffect(() => {
    getSales();
  }, []);

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

  const handleOnShare = (id) => {
    const encodedId = btoa(id);
    const shareUrl = `${window.location.pathname}/share/${encodedId}`;
    window.open(shareUrl, "_blank");
  };

  const handdlePrintInvoicePdf = (id) => {
    // const indexedSale = saleData.reduce((acc, el) => {
    //   acc[el.id] = el;
    //   return acc;
    // }, {});
    // printInvoicePdf({ sale:  indexedSale[id]});
    printInvoicePdf(id);
  };

  // const handleDownloadInvoice = () => {
  //   const doc = new jsPDF();
  //   doc.autoTable({ html: "#sale_table_id" });
  //   doc.save("table.pdf");
  // };

  const handleExportExel = () => {
    exportInvoiceExel({heads: TABLE_HEAD, data: saleData});
  }

  const TABLE_HEAD = [
    { name: "Code", key: "code" },
    { name: "Customer", key: "customer.full_name" },
    { name: "Notes", key: "notes" },
    { name: "Total", key: "total", formatter: format.price },
    { name: "Payment Method", key: "payment_method.name" },
    { name: "Payment Type", key: "payment_type.name" },
    { name: "Next Payment", key: "next_payment_date" },
    { name: "Expiration Date", key: "expiration_date" },
    { name: "Status", key: "status.name" },
    { name: "Actions", key: "actions", onPrint: "HIDDEN" },
  ];

  const rowActions = [
    { name: "Update", function: handleOnUpdate, icon: "fa-solid fa-pen-to-square" },
    { name: "Share", function: handleOnShare, icon: "fa-solid fa-share-from-square" },
    { name: "PDF", function: handdlePrintInvoicePdf, icon: "fa-solid fa-file-pdf" },
    { name: "Delete", function: handleOnDelete, icon: "fa-solid fa-trash" },
  ];

  const controlActions = [
    { name: "Create", function: handleFormModalOpen, icon: "fa-solid fa-file-circle-plus" },
    { name: "Upload", function: null, icon: "fa-solid fa-arrow-up-from-bracket" },
    { name: "Download", function: handleExportExel, icon: "fa-solid fa-cloud-arrow-down" },
    { name: "Print", function: null, icon: "fa-solid fa-print" },
  ];



  return (
    <div className="p-5">
      <div className="max-w-full overflow-x-auto mt-5">
        <CustomTable
          tableId="sale_table_id"
          tableName={"Sales Manager"}
          TABLE_HEAD={TABLE_HEAD}
          items={saleData}
          pagination={true}
          itemsPerPage={7}
          handleFormModalOpen={handleFormModalOpen}
          rowActions={rowActions}
          controlActions={controlActions}
          controls={true}
        />
      </div>
      <SaleForm isOpen={isFormModalOpen} handleOpen={handleFormModalOpen} saleId={saleId} />
      <AlertComponent alertInfo={alertInfo} handleOpenAlertComponent={handleOpenAlertComponent} />
    </div>
  );
};

export default Sales;
