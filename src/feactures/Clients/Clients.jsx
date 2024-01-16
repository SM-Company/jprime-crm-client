import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Button, Card, CardFooter, Typography, Menu, MenuHandler, MenuList, MenuItem, Input } from "@material-tailwind/react";
import clientService from "./services/client.service";
import ClientForm from "./components/ClientForm";
import CustomTable from "../../components/CustomTable/CustomTable";

const Clients = () => {
  const [clientData, setClientData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [clientId, setClientId] = useState("");
  const [BusesFormInfo, setBusesFormInfo] = useState({
    id: null,
    open: false,
    create: true,
  });

  const getClients = async () => {
    const data = await clientService.get();
    if (data.status) {
      setClientData(data.clients);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  const TABLE_HEAD = [
    { name: "Name", key: "name" },
    { name: "Email", key: "user.email" },
    { name: "Phone", key: "phone" },
    { name: "Residential address", key: "residential_address" },
    { name: "Company name", key: "company_name" },
    { name: "Company address", key: "company_address" },
    { name: "Type of company", key: "type_of_company" },
    { name: "Status", key: "user.status.name" },
    { name: "Actions", key: "actions" },
  ];
  
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const handleFormModalOpen = () => {
    setIsFormModalOpen((prevState) => {
      if (prevState) {
        getClients();
        setClientId("");
      }
      return !prevState;
    });
  };

  const handleOnUpdate = (id) => {
    setClientId(id);
    handleFormModalOpen();
  };

  return (
    <div className="p-5">
      <div className="grid grid-cols-12 gap-5 mt-4">
        <div className="col-span-12 sm:col-span-6  lg:col-span-4">
          <Input label="Search" color="purple" onChange={(e) => setFilterText(e.target.value)} className="font-inter" />
        </div>
        <div className="col-span-12 sm:col-span-5 md:col-span-4 lg:col-span-3">
          <Button color="purple" onClick={handleFormModalOpen} className="font-inter w-full">
            New Client
          </Button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto mt-5">
        <CustomTable TABLE_HEAD={TABLE_HEAD} items={clientData} pagination={true} itemsPerPage={7} filterText={filterText} onUpdate={handleOnUpdate} />
      </div>
      <ClientForm isOpen={isFormModalOpen} handleOpen={handleFormModalOpen} clientId={clientId} />
    </div>
  );
};

export default Clients;
