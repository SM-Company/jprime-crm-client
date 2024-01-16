import React, { useEffect, useState } from "react";
import customerService from "./services/customer.service";
import CustomerForm from "./components/CustomerForm";
import CustomTable from "../../components/CustomTable/CustomTable";
import AlertComponent from "../../components/Alert/Alert";

const Customers = () => {
  const [customerData, setCustomerData] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [alertInfo, setAlertInfo] = useState({ openAlert: false });

  const getCustomers = async () => {
    const data = await customerService.get();
    if (data.status) {
      setCustomerData(data.customers);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const TABLE_HEAD = [
    { name: "Code", key: "code" },
    { name: "Full Name", key: "full_name" },
    { name: "Email", key: "email" },
    { name: "Phone", key: "phone" },
    { name: "Address", key: "address" },
    { name: "City", key: "city" },
    { name: "State", key: "state" },
    { name: "Postal Code", key: "postal_code" },
    { name: "Country", key: "country" },
    { name: "Loyalty Points", key: "loyalty_points" },
    { name: "Total Purchases", key: "total_purchases" },
    { name: "Last Purchase Date", key: "last_purchase_date" },
    { name: "Registration Date ", key: "registration_date" },
    { name: "Status", key: "status.name" },
    { name: "Actions", key: "actions" },
  ];

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const handleFormModalOpen = () => {
    setIsFormModalOpen((prevState) => {
      if (prevState) {
        getCustomers();
        setCustomerId("");
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
    setCustomerId(id);
    handleFormModalOpen();
  };

  const deleteCustomer = async ({ id }) => {
    const data = await customerService.delete(id);
    if (data.status) {
      getCustomers();
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
      message: "Are you sure to delete this customer",
      title: "Alert",
      mode: "DANGER",
      id,
      event: "DELETE",
      onConfirm: deleteCustomer,
    });
  };

  return (
    <div className="p-5">
      <div className="max-w-full overflow-x-auto mt-5">
        <CustomTable
          tableName={"Customer Manager"}
          TABLE_HEAD={TABLE_HEAD}
          items={customerData}
          pagination={true}
          itemsPerPage={7}
          controls={true}
          onUpdate={handleOnUpdate}
          onDelete={handleOnDelete}
          handleFormModalOpen={handleFormModalOpen}
        />
      </div>
      <CustomerForm isOpen={isFormModalOpen} handleOpen={handleFormModalOpen} customerId={customerId} />
      <AlertComponent alertInfo={alertInfo} handleOpenAlertComponent={handleOpenAlertComponent} />
    </div>
  );
};

export default Customers;
