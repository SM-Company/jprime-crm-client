import React, { useState } from "react";
import SideBar from "./components/SideBar/SideBar";
import NavBar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";

function MainLayout({ children, pageTitle }) {
  const [openSideBar, setOpenSideBar] = useState(true);

  return (
    <div className="flex w-full h-screen max-h-screen overflow-auto bg-[#ececec]">
      <div className="sticky top-0 p-3 pr-0 h-screen">
        <SideBar open={{ openSideBar, setOpenSideBar }} pageTitle={pageTitle} />
      </div>
      <div className="w-full overflow-x-hidden p-3">
        {/* <div className="sticky top-0 z-10 bg-white rounded-xl"> */}
        <div className="z-10 bg-white rounded-xl">
          <NavBar sideBar={{ openSideBar, setOpenSideBar }} pageTitle={pageTitle} />
        </div>
        <main id="MainMainLayout" className="w-full flex-grow bg-white rounded-xl mt-3">
          {children}
        </main>
        {/* <div className="">
          <Footer className={"fixed bottom-0 p-5 z-20 bg-white"}/>
        </div> */}
      </div>
    </div>
  );
}

export default MainLayout;
