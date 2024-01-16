import React from "react";
import { Typography, Avatar } from "@material-tailwind/react";
import { NavLink, useLocation } from "react-router-dom";
import { ProfileMenu } from "./ProfileMenu";
import { useLayoutContext } from "../../../contexts/Layout/LayoutContext";
import NotificationsMenu from "./Notificationmenu";

export default function NavbarDefault({ sideBar, pageTitle }) {
  const { toggleSidebar } = useLayoutContext();
  const location = useLocation();
  React.useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth <= 960 && toggleSidebar(false));
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <NavLink to="/" className="flex items-center">
          Home
        </NavLink>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <NavLink to="/subscribe/form" className="flex items-center">
          Subcription
        </NavLink>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <NavLink to="/about-us" className="flex items-center">
          About Us
        </NavLink>
      </Typography>
    </ul>
  );

  return (
    <div className="w-full rounded-none ">
      <div className="container p-3 min-w-full flex items-center justify-between  text-blue-gray-900">
        <div className="flex items-center gap-5">
          <i className="fa-solid fa-bars cursor-pointer text-lg text-color-1 pl-4" onClick={toggleSidebar}></i>
          <div>
            <Typography className="font-inter font-normal text-sm capitalize">
              <span className="opacity-80 ">Dashboard</span>{" "}
              {location.pathname.split("/").map((name, index) => {
                if (index !== 0) return " / " + name.replace('-', ' ');
              })}
            </Typography>
            <Typography className="font-inter font-medium capitalize" style={{ marginTop: "-5px" }}>
              {location.pathname.split("/").pop().replace('-', ' ')}
            </Typography>
          </div>
        </div>
        {/* <Typography className="mr-4 cursor-pointer py-1.5 font-medium font-inter uppercase text-[#16191b]">
          {pageTitle}
        </Typography> */}
        {/* <div className="hidden lg:block">{navList}</div> */}
        <div className="flex gap-5 items-center">
          {/* <Avatar
            size="md"
            variant="circular"
            alt="tania andrew"
            className=""
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <Typography className="mr-4 cursor-pointer py-1.5 font-medium">
            Jack Will
          </Typography> */}
          <ProfileMenu />
          <NotificationsMenu />
        </div>
      </div>
    </div>
  );
}
