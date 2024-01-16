import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import authUtils, { roles } from "../../../utils/auth.utils";
import { Card, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Accordion, AccordionHeader, AccordionBody, pography } from "@material-tailwind/react";
import { useState } from "react";
import { useLayoutContext } from "../../../contexts/Layout/LayoutContext";

const SideBar = ({ open }) => {
  const { id } = JSON.parse(localStorage.getItem("user"));
  const { sidebarVisible, toggleSidebarByOver, sidebarVisibleByOver } = useLayoutContext();
  const [openAccordion, setOpenAccordion] = useState("");
  const location = useLocation();
  const Menus = [
    {
      key: 1,
      title: "Dashboard",
      src: "/reservations",
      iconClass: "fa-solid fa-chart-line",
      className: "mt-2",
      role: [roles.ADMIN.id, roles.CLIENT.id],
    },

    {
      key: 4,
      title: "Clients",
      src: "/clients",
      iconClass: "fa-solid fa-users",
      className: "mt-2",
      role: [roles.ADMIN.id],
    },
    {
      key: 5,
      title: "Test ",
      src: "/test",
      iconClass: "fa-solid fa-person-breastfeeding",
      className: "mt-2",
      role: [roles.ADMIN.id],
    },
    {
      key: 6,
      title: "Buses",
      src: "/buses",
      iconClass: "fa-solid fa-bus-simple",
      className: "mt-2",
      role: [roles.ADMIN.id],
    },
    {
      key: 7,
      title: "Inventory",
      iconClass: "fa-solid fa-box-archive",
      className: "mt-2",
      type: "accordion",
      items: [
        { key: 11, title: "Suppliers", src: "/inventory/suppliers" },
        { key: 12, title: "Products", src: "/inventory/products" },
        { key: 13, title: "Product categories", src: "/inventory/product-categories" },
      ],
      role: [roles.CLIENT.id],
    },
    {
      key: 8,
      title: "Customers",
      src: "/customers",
      iconClass: "fa-solid fa-users-line",
      className: "mt-2",
      role: [roles.CLIENT.id],
    },
    {
      key: 9,
      title: "Sales",
      src: "/sales",
      iconClass: "fa-solid fa-money-check-dollar",
      className: "mt-2",
      role: [roles.CLIENT.id],
    },
    {
      key: 10,
      title: "Config",
      src: "/reservations",
      iconClass: "fa-solid fa-gear",
      className: "mt-2",
      role: [roles.ADMIN.id],
    },
  ];

  const getMenus = () => {
    const role = authUtils.role();
    if (role) return Menus.filter((menu) => menu.role.includes(role.id));
    return [];
  };

  return (
    <div
      onMouseOver={() => toggleSidebarByOver(true)}
      onMouseLeave={() => toggleSidebarByOver(false)}
      className={` ${sidebarVisible || sidebarVisibleByOver ? "w-60" : "w-20"} bg-color-1 rounded-xl h-full relative duration-300 whitespace-nowrap`}
    >
      {/* <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        /> */}

      <div className={`flex gap-x-4 items-center  text-white border-b border-gray-600 py-4 pl-1 mx-5`}>
        {/* <img
            src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          /> */}
        <i className="fa-brands fa-slack text-4xl"></i>
        <h1 className={`text-white origin-left font-inter font-medium text-lg duration-200 whitespace-nowrap ${!sidebarVisible && !sidebarVisibleByOver && "scale-0 hover:scale-100"}`}>JPrime CRM</h1>
        {/* <Typography
          className={`text-white origin-left font-regular font-inter text-xs duration-200 whitespace-nowrap ${
            !sidebarVisible && "scale-0"
          }`}
        ></Typography> */}
      </div>
      {/* <hr className="my-2 border-blue-gray-50" /> */}
      <ul className="p-4">
        {getMenus().map(({ className, src, iconClass, title, type, items, key }) => {
          return type === "accordion" ? (
            <Accordion key={key} open={key == openAccordion && (sidebarVisible || sidebarVisibleByOver)}>
              <ListItem className={`p-0 mb-1 hover:bg-[#0C2150] ${items.some((item) => location.pathname.includes(item.src)) && (key !== openAccordion || !sidebarVisible && !sidebarVisibleByOver)? "bg-[#0C2150]" : ""}`} selected={open === 1}>
                <AccordionHeader onClick={() => setOpenAccordion((prevState) => (prevState === key ? "" : key))} className="border-b-0 p-2">
                  <div to={src} className="w-full flex text-gray-300 text-sm items-center ">
                    {/* <img src={`./src/assets/${src}.png`} /> */}
                    <i className={`${iconClass} text-lg w-[35px] pl-[.3em]`}></i>

                    <Typography className={`${!sidebarVisible && !sidebarVisibleByOver && "scale-0"} origin-left duration-200 font-inter font-normal text-sm`}>{title}</Typography>
                  </div>
                  <div>
                    <i
                      className={`fa-solid fa-chevron-right text-xs transform transition-transform text-white duration-200 ease-in-out ${openAccordion === key ? "rotate-90" : ""} ${
                        !sidebarVisible && !sidebarVisibleByOver && "scale-0"
                      }`}
                    ></i>
                  </div>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                {items.map(({ key, title, src }) => (
                  <li
                    key={key}
                    className={`mb-1 flex hover:bg-[#0e1d3d] rounded-lg cursor-pointer text-gray-300 py-2 pl-4 text-sm items-center 
                  ${location.pathname === src ? "bg-[#0e1d3d]" : ""}`}
                  >
                    <Link to={src} className="w-full flex gap-2 items-center">
                      {/* <img src={`./src/assets/${src}.png`} /> */}
                      {/* <i className="fa-solid fa-arrow-right"></i> */}
                      <i class="fa-solid fa-circle text-[.3em] pl-[1em]"></i>
                      <Typography className={`${!sidebarVisible && !sidebarVisibleByOver && "scale-0"} pl-[.7em] origin-left duration-200 font-inter font-normal text-sm`}>{title}</Typography>
                    </Link>
                  </li>
                ))}
              </AccordionBody>
            </Accordion>
          ) : (
            <li
              key={key}
              className={`mb-1 flex rounded-md cursor-pointer p-2 hover:bg-[#0C2150] text-gray-300 text-sm items-center  
            ${location.pathname === src ? "bg-[#0C2150]" : ""}`}
              onClick={() => setOpenAccordion("")}
            >
              <Link to={src} className="w-full flex items-center">
                {/* <img src={`./src/assets/${src}.png`} /> */}
                <i className={`${iconClass} text-lg w-[35px] pl-[.3em]`}></i>

                <Typography className={`${!sidebarVisible && !sidebarVisibleByOver && "scale-0"} origin-left duration-200 font-inter font-normal text-sm`}>{title}</Typography>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default SideBar;
